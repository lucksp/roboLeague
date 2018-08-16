# Robo Sports League Generator

As a league owner, you need to create a tool that allows others to generate teams that can compete
in your league. The purpose of your interface is to allow users to generate, view, and edit their
own rosters in a way that ensures all rosters generated using your tool meet the following
league requirements:

- A roster (a group of players) must be filled with 10 starters and 5 substitutes.
- Each player bot must have a first name and last name, and the following attributes:
  - Speed
  - Strength
  - Each player bot must have a unique first name and last name.
  - Each player bot must have a 6-digit alphanumeric identiier, e.g. &quot;ABC1234&quot;.
  - No two player bots can have the same name.
  - No two player bots can have the same total attribute score.

The total sum of the speed, strength, and agility attributes is calculated as the &quot;total attribute
score&quot; for each player bot. The total attribute score of each of your player bots can not exceed
100 points, and no two players can have the same score.

## Setup

`yarn install`

## Run Dev

`yarn dev`

## Run Prod

`yarn build`
