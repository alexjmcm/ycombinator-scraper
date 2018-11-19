function createPostElem(i, post) {
    let box = $("<div>").addClass("box");
    let title = $("<a>")
        .attr("href", post.link)
        .append(
            `<span class="has-text-grey-dark title is-5">${i +
                1}. ${post.title}</span><br/>`
        );
    let form = $("<form>");
    let nameInput = $("<div>").addClass("field");
    nameInput.append($("<label>").addClass("label").text("Name"));
    nameInput.append(
        $("<div>")
            .addClass("control")
            .append($("<input>").addClass("input").attr("type", "text"))
    );
    let commentBtn = $('<a>').addClass('button is-info commentBtn').attr('id', post._id).attr('title', post.title);
    commentBtn.append($('<span>').text('Insert a Comment'));
    form.append(nameInput);
    box.append(title, "<br/>", commentBtn);
    return box;
}

function createPaginateLink(pageNum, isCurrent) {
    let link = $("<li>");
    if (isCurrent) {
        link.append(
            `<a class="button is-info" aria-label="Page ${pageNum}" aria-current="page">${pageNum}</a><span> &nbsp</span>`
        );
    } else {
        link.append(
            `<a class="button is-info" href="/page?p=${pageNum}" aria-label="Goto page ${pageNum}">${pageNum}</a><span> &nbsp</span>`
        );
    }
    return link;
}

function createComment(comment){
    let elem = $('<article>').addClass('message is-info');
    let header = $('<div>').addClass('message-header').text(comment.name)
        .append($('<button>').addClass('delete').attr('comment_id', comment._id));
    let body = $('<div>').addClass('message-body').text(comment.comment);
    elem.append(header, body);
    return elem;
}