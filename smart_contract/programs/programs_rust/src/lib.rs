use anchor_lang::prelude::*;
use anchor_lang::system_program;

declare_id!("11111111111111111111111111111111"); // Will be updated on deploy

#[program]
pub mod access_marketplace {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>, fee_percent: u8) -> Result<()> {
        require!(fee_percent <= 10, ErrorCode::FeeTooHigh);

        let platform = &mut ctx.accounts.platform_state;
        platform.owner = ctx.accounts.owner.key();
        platform.platform_wallet = ctx.accounts.platform_wallet.key();
        platform.fee_percent = fee_percent;
        platform.bump_state = ctx.bumps.platform_state;
        
        Ok(())
    }

    pub fn register_creator(
        ctx: Context<RegisterCreator>, 
        name: String, 
        description: String, 
        image_url: String
    ) -> Result<()> {
        let creator = &mut ctx.accounts.creator;
        creator.owner = ctx.accounts.owner.key();
        creator.name = name;
        creator.description = description;
        creator.image_url = image_url;
        creator.verified = false;
        creator.paused = false;
        creator.bump = ctx.bumps.creator;
        Ok(())
    }

    pub fn add_plan(
        ctx: Context<AddPlan>, 
        plan_id: u64, 
        duration_seconds: i64, 
        price_lamports: u64
    ) -> Result<()> {
        require!(duration_seconds >= 3600, ErrorCode::DurationTooShort);
        require!(price_lamports > 0, ErrorCode::PriceZero);

        let plan = &mut ctx.accounts.plan;
        plan.creator = ctx.accounts.creator.key();
        plan.plan_id = plan_id;
        plan.duration_seconds = duration_seconds;
        plan.price_lamports = price_lamports;
        plan.active = true;
        plan.bump = ctx.bumps.plan;
        Ok(())
    }

    pub fn buy_access(ctx: Context<BuyAccess>) -> Result<()> {
        let plan = &ctx.accounts.plan;
        let creator = &ctx.accounts.creator;
        let platform = &ctx.accounts.platform_state;
        
        require!(!creator.paused, ErrorCode::CreatorPaused);
        require!(plan.active, ErrorCode::PlanInactive);

        let price = plan.price_lamports;
        let platform_fee = (price * platform.fee_percent as u64) / 100;
        let creator_share = price - platform_fee;

        // Transfer fee to platform
        let cpi_context_platform = CpiContext::new(
            ctx.accounts.system_program.to_account_info(),
            system_program::Transfer {
                from: ctx.accounts.buyer.to_account_info(),
                to: ctx.accounts.platform_wallet.to_account_info(),
            },
        );
        system_program::transfer(cpi_context_platform, platform_fee)?;

        // Transfer share to creator
        let cpi_context_creator = CpiContext::new(
            ctx.accounts.system_program.to_account_info(),
            system_program::Transfer {
                from: ctx.accounts.buyer.to_account_info(),
                to: ctx.accounts.creator_wallet.to_account_info(),
            },
        );
        system_program::transfer(cpi_context_creator, creator_share)?;

        // Update Subscription
        let subscription = &mut ctx.accounts.subscription;
        let current_time = Clock::get()?.unix_timestamp;
        
        // If expired or new, start from now. If active, extend.
        if subscription.expiry < current_time {
            subscription.expiry = current_time + plan.duration_seconds;
        } else {
            subscription.expiry += plan.duration_seconds;
        }

        subscription.user = ctx.accounts.buyer.key();
        subscription.creator = creator.key();
        subscription.bump = ctx.bumps.subscription;

        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = owner, space = 8 + 32 + 32 + 1, seeds = [b"platform"], bump)]
    pub platform_state: Account<'info, PlatformState>,
    /// CHECK: Safe, just receiving funds
    pub platform_wallet: AccountInfo<'info>,
    #[account(mut)]
    pub owner: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct RegisterCreator<'info> {
    #[account(
        init, 
        payer = owner, 
        space = 8 + 32 + 64 + 256 + 256 + 1 + 1 + 1,
        seeds = [b"creator", owner.key().as_ref()], 
        bump
    )]
    pub creator: Account<'info, CreatorState>,
    #[account(mut)]
    pub owner: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(plan_id: u64)]
pub struct AddPlan<'info> {
    #[account(
        init,
        payer = owner,
        space = 8 + 32 + 8 + 8 + 8 + 1 + 1,
        seeds = [b"plan", creator.key().as_ref(), &plan_id.to_le_bytes()],
        bump
    )]
    pub plan: Account<'info, PlanState>,
    #[account(mut, has_one = owner)]
    pub creator: Account<'info, CreatorState>,
    #[account(mut)]
    pub owner: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct BuyAccess<'info> {
    #[account(mut)]
    pub buyer: Signer<'info>,
    
    #[account(mut)]
    pub creator: Account<'info, CreatorState>,
    
    /// CHECK: Must match creator.owner to receive funds
    #[account(mut, address = creator.owner)]
    pub creator_wallet: AccountInfo<'info>,

    #[account(seeds = [b"plan", creator.key().as_ref(), &plan.plan_id.to_le_bytes()], bump = plan.bump)]
    pub plan: Account<'info, PlanState>,

    #[account(seeds = [b"platform"], bump = platform_state.bump_state)]
    pub platform_state: Account<'info, PlatformState>,

    /// CHECK: Must match platform state
    #[account(mut, address = platform_state.platform_wallet)]
    pub platform_wallet: AccountInfo<'info>,

    #[account(
        init_if_needed,
        payer = buyer,
        space = 8 + 32 + 32 + 8 + 1,
        seeds = [b"subscription", creator.key().as_ref(), buyer.key().as_ref()],
        bump
    )]
    pub subscription: Account<'info, SubscriptionState>,

    pub system_program: Program<'info, System>,
}

#[account]
pub struct PlatformState {
    pub owner: Pubkey,
    pub platform_wallet: Pubkey,
    pub fee_percent: u8,
    pub bump_state: u8,
}

#[account]
pub struct CreatorState {
    pub owner: Pubkey,
    pub name: String,
    pub description: String,
    pub image_url: String,
    pub verified: bool,
    pub paused: bool,
    pub bump: u8,
}

#[account]
pub struct PlanState {
    pub creator: Pubkey,
    pub plan_id: u64,
    pub duration_seconds: i64,
    pub price_lamports: u64,
    pub active: bool,
    pub bump: u8,
}

#[account]
pub struct SubscriptionState {
    pub user: Pubkey,
    pub creator: Pubkey,
    pub expiry: i64,
    pub bump: u8,
}

#[error_code]
pub enum ErrorCode {
    #[msg("Platform fee cannot exceed 10 procent")]
    FeeTooHigh,
    #[msg("Creator is paused and cannot accept new purchases")]
    CreatorPaused,
    #[msg("This plan is currently inactive")]
    PlanInactive,
    #[msg("Duration must be at least 1 hour (3600s)")]
    DurationTooShort,
    #[msg("Price must be greater than zero")]
    PriceZero,
}
