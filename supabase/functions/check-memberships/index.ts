import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

Deno.cron("Check Memberships", "0 0 * * *", async () => {
  try {
    // Get memberships expiring in 7 days
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 7);

    const { data: expiringMemberships, error: membershipError } = await supabase
      .from('memberships')
      .select(`
        *,
        centers (name),
        profiles (email)
      `)
      .eq('status', 'active')
      .lt('end_date', expiryDate.toISOString())
      .gt('end_date', new Date().toISOString());

    if (membershipError) throw membershipError;

    // Create notifications for each expiring membership
    for (const membership of expiringMemberships) {
      await supabase
        .from('notifications')
        .insert({
          user_id: membership.user_id,
          title: 'Membership Expiring Soon',
          message: `Your membership at ${membership.centers.name} will expire in 7 days. Please renew to continue enjoying our services.`,
          type: 'membership_expiry',
          related_id: membership.id,
          related_type: 'membership'
        });

      // Send email notification
      const { error: emailError } = await supabase.functions.invoke('send-email', {
        body: {
          to: membership.profiles.email,
          subject: 'Membership Expiring Soon',
          html: `
            <h2>Membership Expiry Notice</h2>
            <p>Your membership at ${membership.centers.name} will expire in 7 days.</p>
            <p>Please log in to your account to renew your membership.</p>
          `
        }
      });

      if (emailError) console.error('Failed to send email:', emailError);
    }
  } catch (error) {
    console.error('Error checking memberships:', error);
  }
});