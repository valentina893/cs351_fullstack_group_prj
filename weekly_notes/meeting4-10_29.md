# Meeting 4 taking place on 10/29 @ 5pm over Discord

Some topics to bring up:
- When to have weekly meetings
- 2nd data structure to use
- New features to add?

Weekly meetings:

2nd Data structure to use:
- still trying to figure out which DS to use.
- NEW Idea: graph:
  - user gets events/results from search engine.
  - user selects a result and can request for location help
      - if user wants location, app searches for location in pre-loaded data set
          - if location is found in the dataset, graph uses a* to find the general path to event location
          - else, app refuses user's request with message "cannot find location of result"
  - to get location, we could ask user for approximate location in pool of options from the dataset, or user chooses from SCE as default starting point

- as backup, we will research more about the available advanced data structures given our project plan to see which secondary one fits best.

new features to add:
- none for now other than location finding feature with graph.

Dale: get frontend and backend communicating effectively is #1 priority
- valentina will update backend to give search results in different usable format.

TODO:
- valentina:
  - reformat search engine output to be easily parsed by frontend (likely json)
  - connecting backend/frontend for login
  - do more research advanced data structures
- dale:
  - connecting backend/frontend for login
  - getting 251 project source code and data files
- nathan:
  - working on frontend, design, presentability
