**Meeting 3 Notes (10/20) – Development Progress and Implementation Updates**

**Topic: Backend and Engine Development**

* Valentina reported that the *engine component* was completed and began planning the *trie implementation*.
* She pushed the updated backend code to a *separate branch* on GitHub (“backend_implementation”).
* Planned to work on the *trie* and *database plugins* the following day.
* Later confirmed that *user login data* storage functions were working, and she also implemented basic *user interest storage and retrieval* functions.
* Valentina asked team members to confirm their active branches:

  * Dale working on **“dale”** branch.
  * Nathan working on **“nathanV”** branch, focusing on frontend.

**Topic: Frontend and UI/UX Planning**

* Valentina initiated discussion on the *frontend design* and asked for input before implementing her own ideas.
* Dale proposed starting with a *simple login page* for now.
* Valentina questioned the need for login functionality and clarified the planned structure:

  * One frame for *interest selection* (using trie data).
  * One frame for *search results* (from the search API).
* Dale confirmed he was *working on the React frontend*, creating a *rough draft* to refine later.
* Valentina suggested Nathan could work on the *Figma design* if Dale focused on React.
* Nathan agreed to design the *results screen* in Figma, based on API output examples shared by Valentina.
* Dale later confirmed the *Figma design was nearly complete*, noting uncertainty about how specific the *interest selection* should be (general vs. detailed categories like “sports” vs. “soccer”).

**Topic: Database and Data Storage Decisions**

* Dale mentioned the project required a *database* per the GitHub README.
* Valentina proposed using *PostgreSQL* for simplicity and local development.
* She also raised questions about how the app should *store and collect data*, identifying the need to define:

  * The *data source* the program uses.
  * The *method of collecting and managing data*.
* The team decided the database would store *user login credentials* and *user interests*.

**Topic: Technical Tasks and Milestone Planning**

* Dale and Valentina coordinated backend and frontend milestones:

  * **Valentina’s tasks:**

    * Finish *PostgreSQL schema* and plugins.
    * Complete *trie implementation*.
    * Update *documentation* and *Milestone 3 answers*.
    * Write *presentation notes*.
  * **Frontend tasks:**

    * Create *login screen*, *interest search screen*, and *results screen*.
* Valentina mentioned she would finalize backend integration in `app.py` and “take losses” with the current milestone if necessary.
* Dale reminded everyone to *merge their branches* once work was complete.

**Next Steps**

* Finish and merge all active branches.
* Finalize backend integration (trie, database, app routing).
* Review and refine Figma prototype.
* Ensure frontend connects to backend components.
* Update and polish project documentation before milestone submission.
