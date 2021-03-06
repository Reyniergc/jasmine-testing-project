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

		/* DONE: Write a test that loops through each feed in the allFeeds object
         * and ensures it has a name defined and that the name is not empty.
         */
		function propertyNameDefinedAndNotEmpty(feedObj) {
			let keyNames = Object.keys(feedObj);

			it('The ' + feedObj.name + ' in allFeeds object are defined and not empty', function() {
				expect(keyNames[0]).toContain("name");
				expect(feedObj.name.length).not.toBe(0);
			});
		}

		// Cicle to loop through each feed in the allFeeds object.
		for (const feed of allFeeds) {
			propertyNameDefinedAndNotEmpty(feed);
		}


        /* DONE: Write a test that loops through each feed in the allFeeds object
         * and ensures it has a URL defined and that the URL is not empty.
         */
		function propertyUrlDefinedAndNotEmpty(feedObj) {
			let keyNames = Object.keys(feedObj);

			it('The ' + feedObj.url + ' in allFeeds object are defined and not empty', function() {
				expect(keyNames[1]).toEqual("url");
				expect(feedObj.url.length).not.toBe(0);
			});
		}
		
		// Cicle to loop through each feed in the allFeeds object.
		for (const feed of allFeeds) {
			propertyUrlDefinedAndNotEmpty(feed);
		}
    });


    /* DONE: Write a new test suite named "The menu" */
	describe('The menu', function() {
        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */

		it('veryfication that the menu is hidden by default', function() {
			expect($('body').hasClass('menu-hidden')).toBe(true);
		});

         /* DONE: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */

		beforeEach(function() {
			this.menu = $(".menu-icon-link");
		});

		it('does the menu display when clicked', function() {
			this.menu.trigger("click");
			expect($('body').hasClass('menu-hidden')).toBe(false);
		});
		
		it('does the menu hide when clicked again', function() {
			this.menu.trigger("click");
			expect($('body').hasClass('menu-hidden')).toBe(true);
		});
	});
	
	/* DONE: Write a new test suite named "Initial Entries" */
	describe('Initial Entries', function() {
		/* DONE: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
		 */
		let classEntryLink = null;
		let oneEntryLink = false;

		beforeEach(function(done) {
			loadFeed(0, function() {
				classEntryLink = document.querySelector(".feed").children;

				for (let index = 0; index < classEntryLink.length; index++) {
					if (classEntryLink[index].className === "entry-link") {
						oneEntryLink = true;
						break;
					}
				}
				done();
			});
		});

		it('there is at least a single element within the feed container', function(done) {
			expect(oneEntryLink).toBe(true);
			done();
		});
	});

	/* DONE: Write a new test suite named "New Feed Selection" */
	describe('New Feed Selection', function() {
		/* DONE: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
		  */

		let oldFeedHtml;
		let newFeedHtml;

		beforeEach(function(done) {
			loadFeed(0, function() {
				oldFeedHtml = document.querySelector(".feed").innerHTML;
				loadFeed(1, function() {
					newFeedHtml = document.querySelector(".feed").innerHTML;
					done();
				});
			});
		});

		it('when a new feed is loaded by the loadFeed function that the content actually changes', function(done) {
			expect(newFeedHtml).not.toEqual(oldFeedHtml);	
			done();
		});
	});
}());
