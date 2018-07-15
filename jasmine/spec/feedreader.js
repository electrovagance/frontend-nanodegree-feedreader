/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('URLs are defined', function() {
            // loop through allFeeds
            for (var i = 0; i < allFeeds.length; i++) {
                // fail test if name is empty or undefined 
                expect(allFeeds[i].url).not.toBeUndefined();
                expect(allFeeds[i].url).not.toBeNull();
            };
            
         });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('names are defined', function() {
            // loop through allFeeds
            for (var i = 0; i < allFeeds.length; i++) {
                // fail test if name is empty or undefined 
                expect(allFeeds[i].name).not.toBeUndefined();
                expect(allFeeds[i].name).not.toBeNull();
            };
            
         });
    });


    describe('The Menu', function () {
        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
         it('element is hidden by default', function() {
            var body = document.getElementsByTagName('body');
            // get's the first class of body which should only be menu-hidden by start
            expect(body[0].className).toEqual('menu-hidden');
            
         });

         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
          it('should appear when clicked, and disappear when clicked again', function() {
            // showMenu is a boolean which changes to true when menu icon is clicked and to false once the menu is displayed 
            var showMenu = false;

            // define spy which spies for a click on menu
            var spyEvent = spyOnEvent($('.menu-icon-link'), 'click');
            $('.menu-icon-link').click();
            showMenu = true;

            // test 1 expectations
            // expects menu icon to have been clicked then resets the spy and sets showMenu to false for test 2
            if  (showMenu) {
                expect('click').toHaveBeenTriggeredOn($('.menu-icon-link'));
                expect(spyEvent).toHaveBeenTriggered();
                showMenu = false;
                spyEvent.reset();
            }
            
            // test 2 expectations
            //  expects menu icon to be clicked
            if (showMenu == false) {
                $('.menu-icon-link').click();
                expect('click').toHaveBeenTriggeredOn($('.menu-icon-link'));
                expect(spyEvent).toHaveBeenTriggered();
            }

          });
    });

    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function(done) {            
            loadFeed(0, function() {
                done();
            });
        });

        it('have at least one entry', function(done){
            // expects one or more entry-link classes inside of the feed div
            expect($('.feed .entry-link')).toBeInDOM();
            done();
        });
    });

    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        // get the content (if any) of feed list and articles before they get updated for later comparison
        var oldFeedName = $('h1').html();
        var oldFeedList = $('.feed').html();

        beforeEach(function(done) {            
            loadFeed(0, function() {
                done();
            });
        });

        it('content should update/change after loading', function(done) {
            // bool which will be set to false if new data matches old data (blog name and blog articles)
            var didDataUpdate = true;            
            var currentFeedName = $('h1').html();
            var currentFeedList = $('.feed').html();

            // checks if current feed name matches or current articles match the old one
            // if yes, set bool to false for test to fail
            if (oldFeedName == currentFeedName || oldFeedList == currentFeedList) didDataUpdate = false;

            expect(didDataUpdate).toEqual(true);
            done();
        });
    });

}());
