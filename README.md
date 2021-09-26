# Cyber4s 3rd Pre-Course Final Project - Elay Gelbart

Welcome to my Todo website repo, before doing anything read the Readme text to ensure you have the best time.

## Technologies i use for Website
![HTML](./Image4Reademe/html.svg) 
![CSS](./Image4Reademe/css.svg) 
![JS](./Image4Reademe/js.svg) 

## User Experience

### Add Task

User can add Task easily by clicking on the input below the selected task type. 
User can send from input to task list by:
1. click on "add Task" button.
2. press "Enter"

### Edit Task 
User can edit task by simply Double Click on selected task and then when they Blur the edited task added to task list

### Remove task
beside every Task there is a Red X by clicking on him the selected task is removed

### Finish task
User can click on Green V to move the task to "done" task list

### Move task list by "Alt" + "Number"
User can click on selected Task and then press Alt+1/2/3 to move the Task List

### Drag and Drop task
User can drag task from one tasklist to other and even rearrange the list by drag and drop by mouse

### Search Task
User can Search Task by typing to the Search input at the top of page.

### Info About Page
User can get info about page and info about who to do all the page Functionality By clicking on info image at side bar and then info is displayed for 5 seconds

### Change Theme
User can Change Theme to Light/Dark by clickng on the Sun Image at sidebar

### Save and Load API Task!
User can save and load from API by clickng on the Clouds at sidebar. or click the buttons at the bottom of the page.

### LocalStorage
When user reloads page, or even close page and open later, his task will remain like it was before user exit page.

### Mobile compatibility
User from mobile get their own design, the problem is with Double Click and Drag And Drop.

## Main Functions
 - [ ] `postTasks()` - the Main function of my site, take Task Object and post him on site into lists.
 - [ ] `addEventListenerToTasks()` - added to each task li element the click,doubleclick,dragNdrop events.
 - [ ] `postTasksforquery()` - just like postTasks() but without DragNDrop button and without the Save to localStorage
 - [ ] `dropTask()` - Take The mockTask and make it real in task Object when user drop.
 - [ ] `postDataToAPI` - Put my Task Object to API, alert an error if something went wrong
 - [ ] `showInfo` - make animation to show the info that until click is hidden. after 5s info gone


## What i learned while working

- [x] How to detect what the test exactly want from me.
- [x] Dive deep(relative) to JS, arrow functions, Array and Objects, and much more. 
- [x] Http request and errors, because it took me hours to understand how to put correctly i learned more about Http methods.
- [x] Window Object and eventlistner related to him.
- [x] SVG, A lot about SVG. from learing about it at all, to adding Animation and starting to change it by myself.
- [x] Drag And Drop. This was the most open minded mission i work one, in Google there isn't exactly what i needed so i learn about it alot and make my own Drag And Drop.
- [x] How to implement Theme To site. CSS var!
- [x] CSS position rules, so many of them
- [x] Mobile compatibility 
- [x] Working with API, i try to work with draggable API to do drag And drop. until i succssed to access the API i didn't had enough time to learn the API.

## My Extras(things not on tests)
 - [x] Theme Changer!
 - [x] X and V buttons to work with Tasks!
 - [x] Sidebar with animated(!) SVG
 - [x] Responsive Info for users about the site.
 - [x] Press "Enter" also adding tasks!
 - [x] Drag and Drop
 - [x] Sick Design

 ## Things i wanted to add and why didn't
 - [ ] Drag and Drop API - Time.
 - [ ] Task label and Task priority - API only get object in certain type, and i wanted the label and priority be in the Task Object.
 - [ ] Mobile full compatibility - Double Click and Drag and Drop. I dont know how.
 - [ ] Add Task other way - wanted to Add Task won't be in the task list and only one Task Add input with list chooser, the test won't pass.
 - [ ] Remove API button elements - test will not pass.

 ## Final Thoughts
 I worked very hard on this website, half of my time was to understand why a certain function work but the Test is not passing. This Work teach my a lot about programming and about my future. i hope i get in to the "Cyber4S" program and have a Good Time in my Website !  