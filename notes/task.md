# Lorem Ipsum Tying Test Game

- HTML
   - markup the HTML document
      - create a container
      - create an inner container
      - create text boxes, one for each text display (5 boxes)- probility P Tags or other sementic element
      - start end and pause button
      - success box that display when time end or play pause or end the game
      - play welcome box with player name, and display name up top left of container and say "Begin"  && || "can you type lorem in under 1 minute, press start to begin"
      - at level 5 say "Congratuation you complete the whole games - you can type lorem ipsum at 110 words under 1 minute" give a download link to a cool prize - ($5 tim hortons card)

- CSS
   - CSS styling 
      - styles the container box with a blue color
      - style the text input color with a light white background
      - have a lorem ipsum placeholder text before the games begin
      - san serif font for the text and header
         - bold or standout H1
         - 500 font weight
         - white text
         - light blue text when player typing 
         - light orange text for error text
         - when play reach certain progress amount of word the colour changes to update how close they are to the target word amount
      - styles the 5 small boxes
         - error boxe - colour start of white and the more error the box colour changes
         - target word amount - it is divided in 3rds and the colour changes per 1rds 
         - level boxe - colour changes as the levels increase
      - start button
         - start first with a green background
      - pause button
         - pause button hidden until start button clicked
         -  background colour of orange
      - end button
         - the start button changes to the end button 
         - has a background colour of light green
      - success box
         - at the lower left corner 
         - hidden until game end 
         - green colour for success
         - orange colour for try again
      - text input container
         - if player finish successfully
            - display sucess in the backbround of the the input container
            - text colour green
         - if player ends games or time is up
            - display try again in the bbackground of the input container
- JavaScript
   - connect the HTML element to the Javascript file
   - create funtions for each component of the games
      - function for the welcome page with the name input and the display of the welcome message on the pages
      - function for the random lorem ipsum text that is alway the right amount for the level
      - function for the Start pause and end button 
      - fucntion for the time count down timer
      - function to display the current word count out of the levels total
      - function to display the word error amount 
      - function to display word per min
      - function for the current level
      - function to diplay the success box
   - function the run the game when the start button is clicke
      - display the random lorem ipsum out the the specified amount
      - when the player types the timer start
      - that word count is updated every time a word is compeleted
      - if there is an error the error counter is updated
      - the words per minute is update as the player types
         - when the games end the success message is shown
         - if the games it pause a pause message is shown
         - when the game end, a message is shown to try again 
   - function that goes to the next level
      - update the level counter
         - changes the level counter text colour
      - restart the game again
      - update the word target to the next level
         - level: 1
            10 words
         - level: 2
            30 words
         - level: 3
            50 words
         - level: 4
            70 words
         - level: 5
            110 words
   - function that display congratutaion you compeleted the game
      - display information to give a gift card or somefitting rewards for playing and compeleted the game
- Reward
   - For each level compeleted
      - display a link to a gift or rewards to be received for completeinig the level
      - if player reaches level 5 display a rewars for a gift certificate
         - level: 1 reward
            - download link
         - level: 2 
            - something free online
         - level: 3
            - candy or chocolate
         - level: 4
            - movie tickets
         - level: 5
            - gift cards 