var counter = 0;
function checkForSuggestButtons()  {
    var suggestButtons = document.getElementsByClassName('bra');
    counter++;
    if (suggestButtons.length) {
        doEverything();
    }
    else if (counter < 25) {
        setTimeout(checkForSuggestButtons, 100);
    }
}

function checkForEmailPage() {
    if (window.location.hash.startsWith("#inbox") && window.location.hash.indexOf('/') >= 0 && !window.location.hash.endsWith('/')) {
        counter = 0;
        checkForSuggestButtons();
    }
}

window.addEventListener("hashchange", checkForEmailPage);
checkForEmailPage();

/**/
function doEverything() {
    var suggestButtons = document.getElementsByClassName('bra');
    var suggestedText = Array.prototype.map.call(suggestButtons, function(x) { return x.innerHTML; });
    var alternateText = suggestedText.map(function(x) {
        /* logic */
        if (x === "Sounds like a plan!") {
            return "Sounds like hot garbage!"
        }
        if (x === "Sounds great, thanks!") {
            return "Sounds lame, thanks for nothing."
        }
        if (x === "Sounds good!") {
            return "Terrible idea!"
        }
        if (x === "Sounds good.") {
            return "Sounds dumb."
        }
        if (x === "Sounds good. See you then.") {
            return "Sounds dumb. How about never?"
        }
        if (x === "Sounds good to me!") {
            return "Sounds stupid to me!"
        }
        if (x === "That works for me.") {
            return "That's stupid."
        }
        if (x === "Cool.") {
            return "Lame."
        }
        if (x === "Let's do it!") {
            return "Never in your life!"
        }
        if (x === "It was great!") {
            return "It sucked!"
        }
        if (x === "It went well.") {
            return "It was bad."
        }
        if (x === "I love it!") {
            return "I hate it!"
        }
        if (x === "I like it!") {
            return "I kinda hate it!"
        }
        if (x === "Looks great!") {
            return "Looks like trash!"
        }
        if (x === "Either day works for me.") {
            return "How about neither day?"
        }
        if (/Let's do ((Mon|Tues|Wed|Thurs|Fri|Sat|Sun)(day))\./.test(x)) {
            return "Let's do never."
        }
        if (/((Mon|Tues|Wed|Thurs|Fri|Sat|Sun)(day)) works for me./.test(x)) {
            return "Never works for me."
        }
        if (x === "Yes, I am working on it.") {
            return "No, I refuse to work on it."
        }
        if (x === "Working on it now.") {
            return "Not really planning to work on it."
        }
        if (x === "No, I have not.") {
            return "No, leave me alone."
        }
        if (x === "No worries, thanks for the update!") {
            return "Ugh, seriously?"
        }
        if (x === "Great news, thanks for the update.") {
            return "Cool story, bro."
        }
        if (x === "That's great news!") {
            return "Um, whatever?"
        }
        if (x === "We will miss you!") {
            return "Good riddance."
        }
        if (x === "Sorry to hear that.") {
            return "Sucks for you."
        }
        if (x === "Approved.") {
            return "No. Just no."
        }
        if (x === "Thanks a lot.") {
            return "Thanks for nothing."
        }
        if (x === "Thank you.") {
            return "What took you so long?"
        }
        if (x === "Sure!") {
            return "Definitely not!"
        }
        if (x === "Yes!") {
            return "No!"
        }
        if (x === "I'm pretty open.") {
            return "I'm busy."
        }
        if (x === "I'm not available this week.") {
            return "I'm busy, go away!"
        }

        var fallbacks = ['Fuck off!', 'You suck.', 'Whatever, loser.', 'Delete your account.', 'k', 'Stop emailing me.', 'Go away.', '🖕', '👎'];

        return fallbacks[Math.floor(Math.random() * fallbacks.length)];
    });

    /* replace the display text*/
    for (var i = 0; i < suggestButtons.length; i++) {
        suggestButtons[i].innerHTML = alternateText[i];
        suggestButtons[i].setAttribute('aria-label', 'Suggested reply, ' + alternateText[i]);
    };

    function checkForReplyBox(i) {
        var replyBox = document.querySelector('div[aria-label="Message Body"]');
        if (replyBox) {
            var discardButton = document.querySelector('div[aria-label="Discard draft"]');
            discardButton.addEventListener('click', checkForSuggestButtons);
            replyBox.innerHTML = alternateText[i] + '&nbsp;<br>';
        } else {
            setTimeout(checkForReplyBox.bind(null, i), 100);
        }
    }

    for (var i = 0; i < suggestButtons.length; i++) {
        suggestButtons[i].addEventListener('click', checkForReplyBox.bind(null, i));
    }
}
