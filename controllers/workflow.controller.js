import { serve } from "@upstash/workflow";
import dayjs from "dayjs";
import Subscription from "../models.js/subscription.model.js";
import { sendReminderEmail } from "../utils/send_email.js";

// btw workflow is triggered just after the subscription is created!
export const sendReminders = serve(async (context) => {
    const { subscriptionId } = context.requestPayload
    const subscription = fetchSubscription(context, subscriptionId)

    const REMINDERS = [7, 5, 3, 2]

    if (!subscription || subscription.status !== 'active') return

    const renewalDate = dayjs(subscription.renewalDate)
    if (renewalDate.isBefore(dayjs())) {
        console.log(`Renewal date has passed for subscription ${subscriptionId}. Stopping workflow `)
        return;
    }

    for (const daysBefore in REMINDERS) {
        const reminderDate = renewalDate.subtract(daysBefore, 'day')
        if (reminderDate.isBefore(dayjs())) {
            // Schedule reminder
            await sleepUntilReminder(context, `Reminder ${daysBefore} days before`, reminderDate)
        }

        if (dayjs.isSame(reminderDate, 'day')) {
            await triggerReminder(context, `${daysBefore} days before reminder`, subscription)
        }

        await triggerReminder(context, `${daysBefore} days before reminder`, subscription)
    }



})

const fetchSubscription = async (context, subscriptionId) => {
    return context.run("get subscription", async () => {
        return Subscription.findById(subscriptionId).populate('user', 'name email')
    })
}

const sleepUntilReminder = async (context, label, date) => {
    console.log(`asleep until ${label} reminder at ${date}`)
    await context.sleepUntil(label, date.toDate())
}

const triggerReminder = async (context, label, subscription) => {
    return context.run(label, async () => {
        console.log(`Triggering ${label} reminder`)
        //send email , sms etc

        await sendReminderEmail({
            to: subscription.user.email, // whoever made the subscription
            type: label,
            subscription: subscription

        })
    })

}