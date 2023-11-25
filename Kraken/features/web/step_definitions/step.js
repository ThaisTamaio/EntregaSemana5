const { Given, When, Then } = require('@cucumber/cucumber');
const { faker } = require('@faker-js/faker');
const { By, Key, browser, Builder } = require('webdriverio');
const { assert, expect } = require('chai');

let title = ""
let postTitle = ""
let originalTitle = ""
let previousTag = ""
let currentTag = ""
let memberName = ""
let originalMemberName = ""
let memberEmail = ""
let originalMemberEmail = ""
let originalMembersNumber = ""
let membersNumber = ""

// ----------------------------------------------------------------------------------------------------------------
// Login
// ----------------------------------------------------------------------------------------------------------------
When('I enter email {kraken-string}', async function (email) {
    let element = await this.driver.$('#identification');
    return await element.setValue(email);
});

When('I enter password {kraken-string}', async function (password) {
    let element = await this.driver.$('#password');
    return await element.setValue(password);
});

When('I click login', async function() {
    let element = await this.driver.$('#ember5');
    return await element.click();
});

// ----------------------------------------------------------------------------------------------------------------
// Post Creation
// ----------------------------------------------------------------------------------------------------------------
When('I click Posts', async function() {
    let element = await this.driver.$('body > div.gh-app > div > nav.gh-nav > div > section > div.gh-nav-top > ul.gh-nav-list.gh-nav-manage > li:nth-child(2)');
    return await element.click();
});

When('I click new post', async function() {
    let element = await this.driver.$('a.ember-view.gh-secondary-action.gh-nav-new-post > span');
    return await element.click();
});

When('I enter title', async function () {
    let element = await this.driver.$('div.gh-editor-title-container.page-improvements');
    title = faker.lorem.lines(1);
    console.log(title);
    return await element.setValue(title);
});

When('I enter paragraphs', async function () {
    let element = await this.driver.$('div.kg-prose');
    return await element.setValue(faker.lorem.paragraphs()+'\n');
});

When('I click add card', async function() {
    let element = await this.driver.$('button.relative');
    return await element.click();
});

When('I click image', async function() {
    let element = await this.driver.$('li.flex:nth-child(1) > ul:nth-child(2) > li:nth-child(1) > button:nth-child(1)');
    return await element.click();
});

When('I click the Publish button', async function() {
    let element = await this.driver.$('.darkgrey > span:nth-child(1)');
    return await element.click();
});

When('I publish', async function() {
    let element = await this.driver.$('.gh-btn-black > span:nth-child(1)');
    return await element.click();
});

When('I confirm the publish', async function() {
    let element = await this.driver.$('div.gh-publish-cta > button > span:nth-child(1)');
    return await element.click();
});

When('I click the schedule dropdown', async function(){
    let element = await this.driver.$('div[data-test-setting="publish-at"] > button');
    return await element.click();
});

When('I click Schedule for later', async function(){
    let element = await this.driver.$('div.gh-publish-schedule > div:nth-child(2)');
    return await element.click();
});

When('I click Preview', async function(){
    let element = await this.driver.$('button[data-test-button="publish-preview"]');
    return await element.click();
});


// ------------------------------------------------
// Post Modification
// ------------------------------------------------
When('I click Published', async function() {
    let element = await this.driver.$('.gh-nav-view-list > li:nth-child(3)');
    return await element.click();
});

When('I click Scheduled', async function(){
    let element = await this.driver.$('.gh-nav-view-list > li:nth-child(2)');
    return await element.click();
});

When('I select a published post', async function() {
    let element = await this.driver.$('div.gh-app > div > main > section > section > div.posts-list.gh-list.feature-memberAttribution > div:nth-child(1)');
    return await element.click();
});

When('I click title', async function() {
    let element = await this.driver.$('div.gh-editor-title-container.page-improvements');
    return await element.click();
});

When('I modify the title', async function () {
    let element = await this.driver.$('div.gh-editor-title-container.page-improvements > textarea');
    originalTitle = await element.getValue();
    console.log(originalTitle);
    await element.clearValue();
    title = faker.lorem.lines(1);
    console.log(title);
    return await element.setValue(title);
});

When('I modify the paragraphs', async function(){
    let element = await this.driver.$('div.kg-prose');
    await element.click();
    await element.keys(["Control","a"]);
    return await element.setValue(faker.lorem.paragraphs()+'\n');
});

When('I click the image' , async function(){
    let element = await this.driver.$('img[data-testid="image-card-populated"]');
    return await element.click();
});

When('I click Replace multimedia element' , async function(){
    let element = await this.driver.$('button[aria-label="Replace"]');
    return await element.click();
});



When('I click the Update button', async function() {
    let element = await this.driver.$('button.gh-btn.gh-btn-editor.gh-editor-save-trigger.green.ember-view');
    return await element.click();
});

When('I go back to Posts', async function() {
    let element = await this.driver.$('a.ember-view.gh-btn-editor.gh-editor-back-button > span');
    return await element.click();
});

// ----------------------------------------------------------------------------------------------------------------
// Page Creation
// ----------------------------------------------------------------------------------------------------------------
When('I click Pages', async function() {
    let element = await this.driver.$('body > div.gh-app > div > nav.gh-nav > div > section > div.gh-nav-top > ul.gh-nav-list.gh-nav-manage > li:nth-child(2)');
    return await element.click();
});

When('I click New Page', async function() {
    let element = await this.driver.$('a.ember-view.gh-btn.gh-btn-primary.view-actions-top-row > span');
    return await element.click();
});

When('I go back to Pages', async function() {
    let element = await this.driver.$('a.ember-view.gh-btn-editor.gh-editor-back-button > span');
    return await element.click();
});
// ------------------------------------------------------
// Page Modification
// ------------------------------------------------------
When('I select a published page', async function() {
    let element = await this.driver.$('div.gh-app > div > main > section > section > div.posts-list.gh-list.feature-memberAttribution > div:nth-child(1)');
    return await element.click();
});


// ----------------------------------------------------------------------------------------------------------------
// Tag Creation
// ----------------------------------------------------------------------------------------------------------------
When('I click Tags', async function() {
    let element = await this.driver.$('body > div.gh-app > div > nav.gh-nav > div > section > div.gh-nav-top > ul.gh-nav-list.gh-nav-manage > li:nth-child(3)');
    return await element.click();
});

When('I click new Tag', async function() {
    let element = await this.driver.$('a.ember-view.gh-btn.gh-btn-primary > span:nth-child(1)');
    return await element.click();
});

When('I enter Tag Name', async function () {
    let element = await this.driver.$('#tag-name');
    return await element.setValue(faker.animal.bird());
});

When('I enter Tag Color', async function () {
    let element = await this.driver.$('body > div.gh-app > div > main > section > form > div.gh-main-section > section > div > div:nth-child(1) > div.gh-tag-settings-multiprop > div.form-group.gh-tag-settings-colorcontainer > div > input');
    return await element.setValue(faker.string.numeric(6));
});

When('I enter Tag Description', async function () {
    let element = await this.driver.$('#tag-description');
    return await element.setValue(faker.lorem.sentence(10));
});

When('I click Save Tag', async function() {
    let element = await this.driver.$('section.view-actions > button');
    return await element.click();
});

When('I click on Tags', async function() {
    let element = await this.driver.$('input.ember-power-select-trigger-multiple-input');
    return await element.click();
});

When('I select a Tag', async function() {
    let element = await this.driver.$('li.ember-power-select-option:nth-child(2)');
    return await element.click();
});

When('I select another Tag', async function() {
    let element = await this.driver.$('li.ember-power-select-option:nth-child(3)');
    return await element.click();
});
// ------------------------------------------------------
// Tag Modification
// ------------------------------------------------------
When('I get the Tag',async function(){
    let element = await this.driver.$(`div.gh-app > div > main > section > section > div.posts-list.gh-list.feature-memberAttribution > div:nth-child(1) > li > a.ember-view.permalink.gh-list-data.gh-post-list-title > p.gh-content-entry-meta > span.gh-content-entry-author > span`);
    previousTag = await element.getText();
    console.log(previousTag);
});

When('I get the new Tag',async function(){
    let element = await this.driver.$(`div.gh-app > div > main > section > section > div.posts-list.gh-list.feature-memberAttribution > div:nth-child(1) > li > a.ember-view.permalink.gh-list-data.gh-post-list-title > p.gh-content-entry-meta > span.gh-content-entry-author > span`);
    currentTag = await element.getText();
    console.log(currentTag);
});

When('I remove a Tag', async function(){
    let element = await this.driver.$(`div.ember-view.ember-basic-dropdown-trigger.ember-basic-dropdown-trigger--in-place.ember-power-select-trigger.ember-power-select-multiple-trigger.gh-token-input  > 
                                       ul.ember-power-select-multiple-options.sortable-objects.ember-view > li.ember-power-select-multiple-option.tag-token.js-draggableObject.draggable-object.ember-view > 
                                       span.ember-power-select-multiple-remove-btn`);
    return await element.click();
});

When("I remove all Tags", async function(){
    let elements = await this.driver.$$(`div.ember-view.ember-basic-dropdown-trigger.ember-basic-dropdown-trigger--in-place.ember-power-select-trigger.ember-power-select-multiple-trigger.gh-token-input  > 
                                    ul.ember-power-select-multiple-options.sortable-objects.ember-view > li`);    
    for (let element in elements) {
        await this.driver.keys('Backspace');
    }
});

// ----------------------------------------------------------------------------------------------------------------
// Member Creation
// ----------------------------------------------------------------------------------------------------------------
When('I click Members', async function() {
    let element = await this.driver.$('body > div.gh-app > div > nav.gh-nav > div > section > div.gh-nav-top > ul.gh-nav-list.gh-nav-manage > li:nth-child(4)');
    return await element.click();
});

When('I click New member', async function() {
    let element = await this.driver.$('.ember-view.gh-btn.gh-btn-primary');
    return await element.click();
});

When('I enter member name', async function () {
    let element = await this.driver.$('#member-name');
    originalMemberName = faker.person.fullName();
    return await element.setValue(originalMemberName);
});

When('I enter member email', async function () {
    let element = await this.driver.$('#member-email');
    originalMemberEmail = faker.internet.email();
    console.log(originalMemberEmail);
    return await element.setValue(originalMemberEmail);
});

When('I enter member note', async function () {
    let element = await this.driver.$('#member-note');
    return await element.setValue(faker.lorem.sentence(10));
});

When('I subscribe the member to the newsletter', async function(){
    let element = await this.driver.$('div.gh-app > div > main > section > div:nth-child(2) > form > div > section > div > div.gh-main-section-content.grey.gh-member-newsletter-section > div.gh-member-newsletters > div > div.for-switch');
    return await element.doubleClick();
});

When('I click Save member', async function() {
    let element = await this.driver.$('.gh-btn.gh-btn-primary.gh-btn-icon.ember-view');
    return await element.click();
});

When('I go back to Members', async function() {
    let element = await this.driver.$('.members_svg__cls-1');
    return await element.click();
});

When('I select the member', async function(){
    let element = await this.driver.$('tbody.ember-view > tr:nth-child(2)');
    return await element.click();
});

// ------------------------------------------------------
// Member Modification
// ------------------------------------------------------
When('I modify the member name', async function () {
    let element = await this.driver.$('#member-name');
    originalMemberName = await element.getValue();
    console.log(originalMemberName);
    await element.clearValue();
    memberName = faker.person.fullName();
    console.log(memberName);
    return await element.setValue(memberName);
});

When('I modify the member email', async function () {
    let element = await this.driver.$('#member-email');
    originalMemberEmail = await element.getValue();
    console.log(originalMemberEmail);
    await element.clearValue();
    memberEmail = faker.internet.email(); // 'Tevin79@gmail.com' // 
    console.log(memberEmail);
    return await element.setValue(memberEmail);
});

When('I unsubscribe the member from the newsletter', async function(){
    let element = await this.driver.$('div.gh-app > div > main > section > div:nth-child(2) > form > div > section > div > div.gh-main-section-content.grey.gh-member-newsletter-section > div.gh-member-newsletters > div > div.for-switch');
    return await element.click();
});

When('I click Export all members', async function(){
    let element = await this.driver.$('button[data-test-button="export-members"]');
    return await element.click();
});

When('I get the total number of members', async function(){
    let element = await this.driver.$('table.gh-list > thead > tr > th:nth-child(1)');
    originalMembersNumber = await element.getText();
    return originalMembersNumber;
});

When('I click Import members', async function(){
    let element = await this.driver.$('span.dropdown.members-actions-dropdown > ul > li:nth-child(1)');
    return await element.click();
});

When('I click to confirm the selection of csv file to import', async function(){
    let element = await this.driver.$('button[data-test-button="perform-import"]');
    return await element.click();
});

When('I close the confirmation window', async function(){
    let element = await this.driver.$('button[data-test-button="close-import-members"]');
    return await element.click();
});


// ----------------------------------------------------------------------------------------------------------------
// Settings
// ----------------------------------------------------------------------------------------------------------------
When('I click Settings', async function() {
    let element = await this.driver.$('body > div.gh-app > div > main > button > span');
    return await element.click();
});

When('I go back to editor', async function() {
    let element = await this.driver.$('button[data-test-button="close-publish-flow"]');
    return await element.click();
});

When('I click the Actions button', async function(){
    let element = await this.driver.$('button[data-test-button="members-actions"]');
    return await element.click();
});

When('I click the filter', async function(){
    let element = await this.driver.$('div[data-test-button="members-filter-actions"] > span.gh-btn-label-green');
    return await element.click();
});

When('I clear the filter', async function(){
    let element = await this.driver.$('button[data-test-button="reset-members-filter"]');
    return await element.click();
});


// ----------------------------------------------------------------------------------------------------------------
// Verification
// ----------------------------------------------------------------------------------------------------------------

Then('I verify that my post has been created', async function(){
    let element = await this.driver.$('div.gh-posts-list-item-group:nth-child(1) > li > a > h3');
    postTitle = await element.getText();
    console.log(postTitle);
    return assert.equal(postTitle, title, 'El post no se creó ni se publicó exitosamente');
});

Then('I verify that my post has been modified', async function(){
    let element = await this.driver.$('div.gh-posts-list-item-group:nth-child(1) > li > a > h3');
    postTitle = await element.getText();
    return assert.notEqual(postTitle, originalTitle, 'El post no se modificó exitosamente');
});

Then('I verify a tag is assigned to the post', async function(){
    let element = await this.driver.$(`div.gh-app > div > main > section > section > div.posts-list.gh-list.feature-memberAttribution > div:nth-child(1) > li > a.ember-view.permalink.gh-list-data.gh-post-list-title > p.gh-content-entry-meta > span.gh-content-entry-author > span`);
    currentTag = await element.getText();
    console.log(currentTag);
    return assert.isDefined(currentTag,"El tag no fue asignado al post");
});

Then('I verify I have assigned the same tag', async function(){
    return assert.equal(previousTag,currentTag,'No se cambió el tag exitosamente')
});

Then('I verify I have changed the tags', async function(){
    return assert.notEqual(previousTag,currentTag,'No se cambió el tag exitosamente')
});

Then('I verify I have deleted all Tags', async function(){
    try {
        let element = await this.driver.$(`div.gh-app > div > main > section > section > div.posts-list.gh-list.feature-memberAttribution > div:nth-child(1) > li > a.ember-view.permalink.gh-list-data.gh-post-list-title > p.gh-content-entry-meta > span.gh-content-entry-author > span`);
        currentTag = await element.getText();
    } catch {

    }
    return assert.equal(currentTag,"","El tag no fue eliminado del post");
});

Then('I verify that my post has multimedia elements', async function(){
    let element = await this.driver.$('div.gh-koenig-editor.relative.z-0 > div.gh-koenig-editor-pane.flex.flex-column.mih-100 > div:nth-child(3) > div > div > div:nth-child(1) > div > div > div > figure > div > img');
    return assert.exists(element, "El elemento multimedia no existe");
});

Then('I verify that my page has been created', async function(){
    let element = await this.driver.$('div.posts-list.gh-list.feature-memberAttribution > div:nth-child(1) > li.gh-list-row.gh-posts-list-item.gh-post-list-plain-status > a.ember-view.permalink.gh-list-data.gh-post-list-title > h3');
    let confirmTitle = await element.getText(); 
    return assert.equal(title, confirmTitle, 'La página no se ha creado exitosamente');
});

Then('I verify a tag is assigned to the page', async function(){
    let element = await this.driver.$(`div.gh-app > div > main > section > section > div.posts-list.gh-list.feature-memberAttribution > div:nth-child(1) > li > a.ember-view.permalink.gh-list-data.gh-post-list-title > p.gh-content-entry-meta > span.gh-content-entry-author > span`);
    currentTag = await element.getText();
    console.log(currentTag);
    return assert.isDefined(currentTag,"El tag no fue asignado al post");
});

Then('I verify that my page has been modified', async function(){
    let element = await this.driver.$('div.gh-posts-list-item-group:nth-child(1) > li > a > h3');
    postTitle = await element.getText();
    return assert.notEqual(postTitle, originalTitle, 'La página no se modificó exitosamente');
});

Then('I verify that a member has been created', async function(){
    let element = await this.driver.$('table.gh-list > tbody.ember-view > tr > a > div > div > p');
    memberEmail = await element.getText();
    console.log(memberEmail);
    return assert.equal(originalMemberEmail, memberEmail, 'El miembro no se creó exitosamente');
});

Then('I verify the subscription is turned on', async function(){
    let element = await this.driver.$('div.gh-app > div > main > section > div:nth-child(2) > form > div > section > div > div.gh-main-section-content.grey.gh-member-newsletter-section > div.gh-member-newsletters > div > div.for-switch > label > input');
    let isSubscribed = await element.getProperty('checked');
    assert.isTrue(isSubscribed,"El miembro no está suscrito a ningún newsletter")
});

Then('I verify the subscription is turned off', async function(){
    let element = await this.driver.$('div.gh-app > div > main > section > div:nth-child(2) > form > div > section > div > div.gh-main-section-content.grey.gh-member-newsletter-section > div.gh-member-newsletters > div > div.for-switch > label > input');
    let isSubscribed = await element.getProperty('checked');
    assert.isFalse(isSubscribed,"El miembro no está suscrito a ningún newsletter")
});

Then('I save my member info updates', async function(){
    let element = await this.driver.$('button.gh-btn.gh-btn-primary.gh-btn-icon.ember-view > span');
    await element.click();
    let buttonStatus = await element.getProperty('dataset.testTaskButtonState');
    console.log(buttonStatus);
    let updateStatus = buttonStatus == 'failure' ? false : true;
    assert.isTrue(updateStatus,'No se pueden guardar los cambios');
    assert.notEqual(memberEmail, originalMemberEmail, 'El miembro no fue modificado exitosamente')
});

Then('I verify the number of members is the same', async function(){
    let element = await this.driver.$('table.gh-list > thead > tr > th:nth-child(1)');
    membersNumber = await element.getText();
    assert.equal(membersNumber, originalMembersNumber,'El proceso de importar usuarios previamente exportados ha creado nuevos records');
});
