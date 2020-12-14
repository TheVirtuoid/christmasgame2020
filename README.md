Boring JavaScript Presents...
# Holiday Game 2020

Hi everybody! As the final edition of Boring JavaScript for the year 2020, I thought I'd present a small, boring game that uses some of the concepts we've ... well I've ... talked about over this past year.

**THIS REPOSITORY IS PUBLIC AND FREE TO USE AND CLONE.**

## Are There Direct Links?

Yes! 

The Game Itself: [Boring JavaScript Holiday Game 2020](https://www.boringjavascript.com/holidaygames/2020/game.html)

Github: [Boring JavaScript Holiday Game 2020 on Github](https://github.com/TheVirtuoid/holidaygame2020)

The Github repository is open to the public. And the code is free! I hereby grant you the rights to copy it for your own benefit in any way you see fit, as long as you give me credit. 

**Feel free to even submit PRs to this repository!**

## What's It All About?

I decided to take the last few weeks of December off before getting back into Boring JavaScript at the start of 2021. I was thinking of what my last episode would be.

Then I thought - well, the holiday's are a time for gift giving and games, so why not make a game? After ten days of working off-time, I got a game that works (but not fully complete). And that is the subject of this README and the last Boring JavaScript entry of 2020.

## Concepts Used

Here are the technologies I used in creating this game:

- **Classes**. Used extensively, (perhaps too extensively), a Class represents an object on the screen. The ```extend``` syntax is used heavily.
  
- **Modules**. Everything is an ES6 module, including the single JS that is loaded by the HTML.
  
- **Canvas**. I have never worked with HTML Canvas before, so this was a great learning adventure.
  
- **Animation and Hit Detection**. Santa and the Bad Items move, so there needs to be some sort of animation routine determined. I started using ```setInterval()```, but found that it would not scale well. ```requestAnimationFrame()``` saved the day.
  
- **Device Orientation**. I really, really wanted this work on a smart phone/tablet, so I learned all about how to capture the phone/tablet orientation as a JavaScript event. It was easier than I expected, but it made the game complete.
  
- **Read only Properties**. I figured out a way to randomize a read-only property on a class - basically it changes each time you read it. Fun!
  
## Things To Do

You are free to clone the repository and make any changes you want. You can make it your own, if you wish. It's all free of charge and free to use. I do encourage you to create pull requests on the repository.

Given that, there are some things I know needs to be done:

1. **Canvas Rendering**. I am certain that my animation and hit determination routines can be improved upon immensely. I am not a game designer.

2. **Class Consolidation**. I feel there are too many classes, and these can be simplified.

3. **Common Data**. A **lot** of common data is stored in the Game class. I don't feel this is right. My gut tells me there has to be a better way to share data.

## Above All, Have Fun

This is my holiday gift to you. Run with it and have fun!

## Other Links

[Boring JavaScript Github](https://github.com/TheVirtuoid/boringjavascript)

[Boring JavaScript YouTube Channel](https://www.youtube.com/channel/UCKZ7CV6fI7xlh7zIE9TWqgw)

[TheVirtuoid Blog](https://blog.thevirtuoid.com/)


