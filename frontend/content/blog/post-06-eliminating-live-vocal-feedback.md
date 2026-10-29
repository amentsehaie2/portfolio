---
title: "Eliminating Live Vocal Feedback: What Church Sound Taught Me"
metaDescription: "How a self-taught church sound tech prevents and fixes vocal feedback: gain staging, mic technique, monitor placement, EQ sweeps and switching to in-ears."
slug: eliminating-live-vocal-feedback
primaryKeyword: how to stop mic feedback
secondaryKeywords: [vocal feedback church sound, monitor placement feedback, ring out monitors, gain before feedback, in-ear monitors church]
persona: Sanctuary Sam   # [CHECK: confirm persona]
funnelStage: decision   # [CHECK: match your funnel mapping on the strategy slide]
readingTime: 8 min
---

# Eliminating Live Vocal Feedback

Feedback is the sound every church sound tech fears: a howl or a sharp ringing that comes out of nowhere, in the middle of worship, while the whole congregation turns around to look at the desk.

I've had it happen with a worship leader on stage. I've seen her panic because of it. And I've spent a lot of Sunday mornings learning how to prevent it. This last post in the series collects everything I've learned about feedback behind the mixer: what causes it, what I do in the moment, and what we changed in our church so it happens much less.

- **Who this is for:** you've just started running sound at church (or you're about to), and you want to know what to do when a vocal mic starts to howl. If you're completely new to the desk, read [Sunday Morning Panic](/blog/sunday-morning-panic) first. It covers gain staging and the basic Sunday routine this post builds on.


![A photo about me playing at a gig](/images/blog/guitar_portrait_5.webp)
*Photo by author.*

---

## What feedback actually is

Feedback is a loop. The mic picks up the sound coming out of a speaker or monitor, the desk amplifies it, the speaker plays it louder, the mic picks it up again, and so on. When one frequency keeps getting louder on every lap around that loop, you hear it as a ring, then a howl.

Three things decide whether that loop takes off:

1. **How much gain you give the mic.** More gain means the mic hears the speakers more loudly.
2. **Where the speakers and monitors point** relative to the mic.
3. **The room.** Hard walls and lots of reverb keep certain frequencies bouncing around.

Every fix in this post works on one of those three.

---

## The worst feedback I've had

We had a worship leader whose voice was quite soft. To hear her in the mix, we had to set her gain quite high.

During worship, she slowly moved closer and closer to her monitor. Then her mic technique changed from how she'd held it in sound check. 
The feedback became intense. She panicked. We pulled her gain down quickly, and that stopped it in the moment.

But the damage was done. She was scared, and for the rest of the set she sang even softer than before. The congregation could barely hear the person leading them. The feedback lasted seconds. The effect on the worship lasted the whole service.

That experience taught me two things:

- **Sound check gain has to match the real performance.** We set her gain for a soft voice at a distance. Once she moved, that setting was dangerous.
- **Feedback isn't just a technical problem.** It shakes the person on stage. A calm, fast fix matters as much for her confidence as for the sound.

---

## Not everything that sounds like feedback *is* feedback

The other big scare I've had sounded awful, but it wasn't acoustic feedback.

During the service, the wireless mic channels suddenly started sounding harsh and distorted, like a voice on a phone call. Touching the XLR cables made it worse. The sound check wasn't even finished, the service had already started, and I was playing guitar *and* helping with sound. We used the prayer moment (and asked the person praying to keep going a little longer) to swap everything to wired mics and fresh XLR cables. We then mixed the rest of the service without a proper sound check. I tell the full story in [Sunday Morning Panic](/blog/sunday-morning-panic).

What caused it? Honestly, we still don't know. That Sunday was the first time we used cameras connected over the network for streaming, and we haven't streamed since. It hasn't happened again either. So the streaming setup is our main suspect, but it isn't proven. 

The lesson for this post: **real feedback is a ring or howl at one pitch that grows over time.** Crackles, hum, buzzing or a "phone call" sound point to a cable, connection, power or wireless problem. Pulling the gain down won't fix those. Knowing the difference saves you precious seconds. [Shure's wireless dropout guide](https://www.shure.com/en-US/insights/troubleshooting-wireless-dropouts-10-simple-steps) is a good checklist for the wireless side. One of its first tips: watch the receiver's RF meter when the problem happens. If the RF signal stays steady, the problem is in the audio path (mic, cable) rather than the wireless signal.

---

## Why our sanctuary likes to feed back

Our church is big and has a lot of reverb. When the walls keep reflecting one particular frequency, a ringing, beeping tone can build up fast, even before you hear full-blown feedback. That's why we EQ the whole system and every vocal channel carefully.

Monitors made it worse. Floor wedges point back at the stage, right where the vocal mics are. Every wedge is a speaker aimed at a microphone.

![A singer in a yellow top sings into a handheld microphone on a dark stage, with floor monitor wedges angled toward the stage in the bottom corner](/images/blog/stock-singer-on-stage.webp)
*Photo by [MD Duran](https://unsplash.com/photos/NaTzgXieUlo), Unsplash.*

---

## The biggest fix: in-ear monitors (for some of us)

Our biggest improvement came when we moved to the Allen & Heath Qu-6D and started using in-ear monitors. We bought [Behringer P2 personal in-ear amplifiers](https://www.sweetwater.com/store/detail/PowerPlay2), small belt packs that take a monitor mix from the desk over XLR and drive a set of earphones.

We didn't switch everyone at once:

| Who | Monitoring | Why |
|---|---|---|
| Instrumentalists | In-ears (Behringer P2) | Fewer wedges on stage, and their own mix |
| Vocalists | Two floor wedges | Many singers aren't used to earphones, and in-ears can sound unnatural to them at first |

That combination already solved a lot. Fewer wedges on stage means fewer speakers pointing at mics. It also let us set up a **talkback mic**, so the desk can talk to the band through their in-ears without shouting across the room. This was huge for us. We finally had the option of having our very own mix, as well as some clear directions from the md on where to go to during the worship.

---

## Prevention: what we do before the service

### 1. Sound check like it's the real thing

At every sound check we remind the vocalists to hold the mic close to their mouth and to sing at full volume. That way we set the gain for how they'll actually sing in the service, not for a quiet "check, check." A strong signal close to the mic means we need less gain, and less gain means less risk of feedback. [QSC's guide to mic technique](https://support.qscaudio.com/sound-advice/sound-advice-%7C-microphone-techniques-to-avoid-feedback) explains why: a mic held too far away forces you to turn up the gain, and that leads to feedback.

### 2. Teach singers not to cup the mic

When a singer wraps a hand around the grille, a directional vocal mic loses its directionality and starts picking up sound from behind, including the monitors. [Sweetwater explains](https://www.sweetwater.com/insync/?p=202935) that cupping can turn a cardioid pattern into an omnidirectional one. Hold the mic by the handle, not the ball.

### 3. Point the monitors at the singer, and at the back of the mic

We place the vocal wedges in the center, angled toward the singers, so they can hear themselves without walking up to the monitor. That's exactly what went wrong with our worship leader.

The mic matters here too. A cardioid vocal mic rejects sound best from directly behind. According to [Shure](https://www.shure.com/en-GB/insights/three-reasons-why-mic-placement-matters), lining up your monitors with the mic's angle of rejection gives you the most gain before feedback, but every system will feed back eventually if you keep turning it up.

### 4. If there are no monitors: keep the mains in front of the mics

In the rare case that we have no monitors, the singers stand **behind** the main speakers. We place the speakers wide apart, with the singers in the middle, and aim the speakers at the center of the congregation. That way the singers still hear a bit of themselves, and the mics stay out of the speakers' direct path.

### 5. EQ every vocal

Every singer is different, so there is no single preset. But this is my starting point:

| Step | What I do | Why |
|---|---|---|
| High-pass filter | Around 100 Hz | Vocals don't need that low end. It only adds mud and rumble. |
| Feedback cuts | Small, narrow cuts where the room rings | Found by EQ sweeping (see below) |
| Low-pass filter | At the very top of the range | Cleaner sound, and fewer harsh frequencies to ring |


### 6. Find the ringing frequency with an EQ sweep

This is the technique I use most. I briefly boost a narrow EQ band and slowly sweep it across the frequencies while the mic is live. When the ringing gets much worse, I've found the problem frequency. Then I turn that boost into a small cut.

Engineers call the full version of this **"ringing out"** a monitor or system: you slowly raise the level until it just starts to ring, then cut that frequency, and repeat. [FOH magazine's guide](https://fohonline.com/?p=121975) walks through the process. It also warns that it's a game of diminishing returns: the more gain you add, the more likely feedback becomes, no matter how much you EQ.

---

## In the moment: my feedback triage

When it rings during a service, there's no time to think. So this is my order:

1. **Bring the gain down** on the channel that's feeding back. In my experience, gain is usually the cause. Because it sits before both the main speakers and the monitor sends, it calms down both at once.
2. **If it's really bad, mute the channel** and pull down the fader and gain together. Wait for the ringing to die out.
3. **Bring it back slowly.** Unmute and raise the gain until it's at a healthy level again.
4. **Sweep the EQ** to find the frequency that rang, and cut it. During the service I do this carefully, or I wait until a quieter moment.
5. **Check the stage.** Did someone move closer to a monitor? Is a singer cupping the mic? Sometimes the real fix is a hand signal, not a knob.

I'm not the only one who fixes feedback by hand. In a research review of fifty years of acoustic feedback control, van Waterschoot and Moonen (2011) note that many PA technicians *still* prefer manual feedback control to automatic suppressors, because the automatic solutions aren't reliable enough: howling can still happen, and the system may take longer to catch it.

---

## My one rule for your first service

**Get a strong, close signal at sound check, and use as little gain as you can.**

Almost every feedback problem I've had comes back to gain. A singer who sings strong and close into the mic needs less gain. Less gain means the mic hears less of the speakers. And less of the speakers means less feedback. Monitors, EQ and in-ears all help, but they help most when the gain was right to begin with.

---

## Wrapping up the series

This is the last of six posts. I started on a high-action Spanish acoustic during lockdown ([The Self-Taught Path](/blog/the-self-taught-path)), built a budget home studio ([The €150 Home Studio](/blog/the-150-home-studio)), got thrown in the deep end behind the mixer ([Sunday Morning Panic](/blog/sunday-morning-panic)), learned to play in a worship band ([First Time Playing at the Sanctuary](/blog/first-time-playing-at-the-sanctuary)) and figured out how to get clean guitar tones with cables instead of mics ([Electric vs. Acoustic](/blog/electric-vs-acoustic-clean-guitar-tracks)).

Every step had the same lesson: you learn fastest by doing it, getting it wrong, and asking *why*.

---

**Keep reading:**
- [Sunday Morning Panic](/blog/sunday-morning-panic): my full Sunday sound routine
- [Electric vs. Acoustic](/blog/electric-vs-acoustic-clean-guitar-tracks): why we use cables instead of mics for guitars
- [All posts](/blog)


---