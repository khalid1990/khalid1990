var dataUrl = 'https://my-json-server.typicode.com/khalid1990/ofrs/offers';

fetch(dataUrl).then(function(response){
    response.json().then(function(jsonData){
        for (var i=0; i< jsonData.length; i++) {
            renderOfferCard(jsonData[i]);
        }
    });
});

function renderOfferCard(offer) {
    var container = document.getElementById("container");

    var card = createElementWithClassName("div", "card");
    card.appendChild(mainImageSection(offer.imageUrl));
    card.appendChild(cardBottomSection(offer));

    container.appendChild(card);
}

function cardBottomSection(offer) {
    var card_bottom = createElementWithClassName("div", "card-bottom");

    card_bottom.appendChild(titleSection(offer.title));
    card_bottom.appendChild(timeDurationSection(offer.fromDate, offer.toDate));
    card_bottom.appendChild(contentSection(offer.description));
    card_bottom.appendChild(readFullStorySection());
    //card_bottom.appendChild(shareBarSection());

    return card_bottom;
}

function shareBarSection() {
    var share_bar = createElementWithClassName("div", "share-bar");
    var share_on_span = createElementWithClassName("span", "on-big-screen");
    share_on_span.appendChild(document.createTextNode("Share on"));

    var social_block_twtr = createElementWithClassName("div", "social-block");
    var social_share_link_twtr = createElementWithClassName("a", "social-cursive-title");
    social_share_link_twtr.href="#";
    social_share_link_twtr.appendChild(document.createTextNode("Twitter"));
    var icon_twtr = createElementWithClassName("i", "fab fa-twitter white");

    social_block_twtr.appendChild(share_on_span);
    social_block_twtr.appendChild(social_share_link_twtr);
    social_block_twtr.appendChild(icon_twtr);
    share_bar.appendChild(social_block_twtr);

    var social_block_fb = createElementWithClassName("div", "social-block");
    var social_share_link_fb = createElementWithClassName("a", "social-cursive-title");
    social_share_link_fb.href="#";
    social_share_link_fb.appendChild(document.createTextNode("Facebook"));
    var icon_fb = createElementWithClassName("i", "fab fa-facebook white");

    social_block_fb.appendChild(share_on_span);
    social_block_fb.appendChild(social_share_link_fb);
    social_block_fb.appendChild(icon_fb);
    share_bar.appendChild(social_block_fb);

    return share_bar;
}

function readFullStorySection() {
    var read_full_story = createElementWithClassName("div", "read-full-story");
    var link = document.createElement("a");
    link.href="#";
    var text = document.createTextNode("Read Full Story >>");
    link.appendChild(text);
    read_full_story.appendChild(link);

    return read_full_story;
}

function contentSection(contentText) {
    var content = createElementWithClassName("div", "content");
    var text = document.createTextNode(contentText);
    content.appendChild(text);

    return content;
}

function titleSection(titleText) {
    var title = createElementWithClassName("div", "title");
    var text = document.createTextNode(titleText);
    title.appendChild(text);

    return title;
}

function timeDurationSection(fromDate, toDate) {
    var time_duration = createElementWithClassName("div", "time-duration");
    var text = document.createTextNode(fromDate + " - " + toDate);
    time_duration.appendChild(text);

    return time_duration;
}

function mainImageSection(imageUrl) {
    var main_img = createElementWithClassName("div", "main-img");

    var img = document.createElement("img");
    img.height="100%";
    img.width="100%";
    img.src=imageUrl;

    main_img.appendChild(img);

    return main_img;
}

function createElementWithClassName(tag, className) {
    var element = document.createElement(tag);
    element.className += className;

    return element;
}
