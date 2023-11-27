const { Given, When, Then } = require('@cucumber/cucumber');
const { faker } = require('@faker-js/faker');
const { By, Key, browser, Builder } = require('webdriverio');
const { assert, expect } = require('chai');
const axios = require('axios');

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
let originalMemberNote = ""
let originalUserEmail = ""
let originalUserPassword = ""

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

// --------------------------------
// Global Settings
// --------------------------------

When('I click Global Settings', async function(){
    let element = await this.driver.$('a[href="#/settings/"] > svg');
    return await element.click();
});

When('I click View History', async function(){
    let element = await this.driver.$('div[data-testid="history"] > div > div:nth-child(2) > button');
    return await element.click();
});

When('I click Open Labs', async function(){
    let element = await this.driver.$('div[data-testid="labs"] > div:nth-child(2) > button');
    return await element.click();
});

When('I click Edit Publication Language', async function(){
    let element = await this.driver.$('div[data-testid="publication-language"] > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > button');
    return await element.click();
});

When('I clear the Publication Language field', async function(){
    let element = await this.driver.$('div[data-testid="publication-language"] > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > input');
    return await element.clearValue();
});

When('I enter new Publication Language {string}', async function(lang){
    let element = await this.driver.$('div[data-testid="publication-language"] > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > input');
    await element.click();
    return await element.setValue(lang);
});

Then('I save Publication Language', async function(){
    let element = await this.driver.$('div[data-testid="publication-language"] > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > button:nth-child(2)');
    return await element.click();
});

Then('I use Export Analytics', async function(){
    let element = await this.driver.$('div[data-testid="analytics"] > div:nth-child(4) > button');
    return await element.click();
});

Then('I use Export Content', async function(){
    let element = await this.driver.$('.border-grey-700 > section:nth-child(3) > div:nth-child(2) > div:nth-child(1) > section:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > button:nth-child(1) > span:nth-child(1)');
    return await element.click();
});

Then('I close History', async function(){
    let element = await this.driver.$('.bg-black');
    let buttonText = await element.getProperty('innerText')
    assert.equal(buttonText,"Close","Botón de cerrar no existe, por ende el System Event Log no se abrió")
    return await element.click();
});

// ----------------------------------------------------------------------------------------------------------------


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
    return assert.isTrue(isSubscribed,"El miembro no está suscrito a ningún newsletter")
});

Then('I verify the subscription is turned off', async function(){
    let element = await this.driver.$('div.gh-app > div > main > section > div:nth-child(2) > form > div > section > div > div.gh-main-section-content.grey.gh-member-newsletter-section > div.gh-member-newsletters > div > div.for-switch > label > input');
    let isSubscribed = await element.getProperty('checked');
    return assert.isFalse(isSubscribed,"El miembro no está suscrito a ningún newsletter")
});

Then('I save my member info updates', async function(){
    let element = await this.driver.$('button.gh-btn.gh-btn-primary.gh-btn-icon.ember-view > span');
    await element.click();
    let buttonStatus = await element.getProperty('dataset.testTaskButtonState');
    console.log(buttonStatus);
    let updateStatus = buttonStatus == 'failure' ? false : true;
    assert.isTrue(updateStatus,'No se pueden guardar los cambios');
    return assert.notEqual(memberEmail, originalMemberEmail, 'El miembro no fue modificado exitosamente')
});

Then('I verify the number of members is the same', async function(){
    let element = await this.driver.$('table.gh-list > thead > tr > th:nth-child(1)');
    membersNumber = await element.getText();
    return assert.equal(membersNumber, originalMembersNumber,'El proceso de importar usuarios previamente exportados ha creado nuevos records');
});




// A Priori Data

When('I enter member name {string}', async function (member_name) {
    let element = await this.driver.$('#member-name');
    originalMemberName = member_name;
    return await element.setValue(member_name);
});

When('I enter member email {string}', async function (member_email) {
    let element = await this.driver.$('#member-email');
    originalMemberEmail = member_email;
    return await element.setValue(member_email);
});

When('I enter member note {string}', async function (member_note) {
    let element = await this.driver.$('#member-note');
    originalMemberNote = member_note;
    return await element.setValue(member_note);
});

When('I enter my email {string}', async function (user_email) {
    let element = await this.driver.$('#identification');
    originalUserEmail = user_email
    return await element.setValue(user_email);
});

When('I enter my password {string}', async function (user_password) {
    let element = await this.driver.$('#password');
    originalUserPassword = user_password
    return await element.setValue(user_password);
});


When('I enter my Tag Name {string}', async function (tag_name) {
    let element = await this.driver.$('#tag-name');
    return await element.setValue(tag_name);
});

When('I enter my Tag Color {string}', async function (tag_color) {
    let element = await this.driver.$('body > div.gh-app > div > main > section > form > div.gh-main-section > section > div > div:nth-child(1) > div.gh-tag-settings-multiprop > div.form-group.gh-tag-settings-colorcontainer > div > input');
    return await element.setValue(tag_color);
});

When('I enter my Tag Description {string}', async function (tag_description) {
    let element = await this.driver.$('#tag-description');
    return await element.setValue(tag_description);
});

When('I enter a slug {string}', async function (tag_slug) {
    let element = await this.driver.$('#tag-slug');
    return await element.setValue(tag_slug);
});

When('I enter my first title {string}', async function (first_title) {
    let element = await this.driver.$('div.gh-editor-title-container.page-improvements');
    return await element.setValue(first_title);
});

When('I enter my title {string}', async function (post_title) {
    let element = await this.driver.$('div.gh-editor-title-container.page-improvements');
    return await element.setValue(post_title);
});
When('I enter my paragraphs {string}', async function (post_paragraphs) {
    let element = await this.driver.$('div.kg-prose');
    return await element.setValue(post_paragraphs);
});

When('I enter date {string}', async function (date_settings) {
    let element = await this.driver.$('.gh-date-time-picker-date > input:nth-child(1)');
    return await element.setValue(date_settings);
});

When('I enter hour {string}', async function (hour_settings) {
    let element = await this.driver.$('.gh-date-time-picker-time > input:nth-child(1)');
    return await element.setValue(hour_settings);
});

When('I enter excerpt {string}', async function (excerpt_settings) {
    let element = await this.driver.$('#custom-excerpt');
    return await element.setValue(excerpt_settings);
});




//--------


Then('I verify the behavior while saving member', async function(){
    if (originalMemberNote == 'Escenario original: todo bien') {
        let element = await this.driver.$('body > div.gh-app > div > main > section > div:nth-child(2) > form > div > section > section > div > div.gh-member-details-attribution > p');
        let isCreated = await element.isExisting();
        return assert.isTrue(isCreated,'El miembro no fue creado');
    } else if (originalMemberNote == 'Escenario 1: email duplicado') {
        let element = await this.driver.$('body > div.gh-app > div > main > section > div:nth-child(2) > form > div > section > div > div:nth-child(1) > div > div.gh-cp-member-email-name > div.form-group.max-width.error > p');
        let errorMessage = await element.getText();
        return assert.equal(errorMessage, "Member already exists. Attempting to add member with existing email address", "Error: mensaje no es el esperado")
    } else if (originalMemberNote == 'Escenario 2: email en blanco') {
        let element = await this.driver.$('body > div.gh-app > div > main > section > div:nth-child(2) > form > div > section > div > div:nth-child(1) > div > div.gh-cp-member-email-name > div.form-group.max-width.error > p');
        let errorMessage = await element.getText();
        return assert.equal(errorMessage, "Please enter an email.", "Error: mensaje no es el esperado")
    } else if (originalMemberNote == 'Escenario 3: email inválido') {
        let element = await this.driver.$('body > div.gh-app > div > main > section > div:nth-child(2) > form > div > section > div > div:nth-child(1) > div > div.gh-cp-member-email-name > div.form-group.max-width.error > p');
        let errorMessage = await element.getText();
        return assert.equal(errorMessage, "Invalid Email.", "Error: mensaje no es el esperado")
    } else if (originalMemberNote == "Escenario 4: nombre excede límite de caracteres") {
        let element = await this.driver.$('body > div.gh-app > div > main > section > div:nth-child(2) > form > div > section > div > div:nth-child(1) > div > div.gh-cp-member-email-name > div:nth-child(1) > p');
        let errorMessage = await element.getText();
        return assert.equal(errorMessage, "Name cannot be longer than 191 characters.", "Error: mensaje no es el esperado");
    } else if (originalMemberName == "Escenario 5: nota excede límite de caracteres") {
        let element = await this.driver.$('body > div.gh-app > div > main > section > div:nth-child(2) > form > div > section > div > div:nth-child(1) > div > div.form-group.mb0.gh-member-note.error > p.response');
        let errorMessage = await element.getText();
        return assert.equal(errorMessage, "Note is too long.", "Error: mensaje no es el esperado") 
    }
});

Then('I verify the behavior while try to login {string}', async function(id){
    if (id == '1') {
        let element = await this.driver.$('.main-error');
        let errorMessage = await element.getText();
        return assert.ok(errorMessage.includes("Please fill out the form to sign in."), "Error: mensaje no es el esperado")
    } else if (id == '2') {
        let element = await this.driver.$('.main-error');
        let errorMessage = await element.getText();
        return assert.ok(errorMessage.includes("Your password is incorrect.") , "Error: mensaje no es el esperado")
    } else if (id == '3') {
        let element = await this.driver.$('.main-error');
        let errorMessage = await element.getText();
        return assert.ok(errorMessage.includes("There is no user with that email address."), "Error: mensaje no es el esperado")
    }
});

Then('I verify the behavior while saving Tag {string}', async function(id){
    if (id == '1') {
        let element = await this.driver.$('p.response:nth-child(1)');
        let errorMessage = await element.getText();
        return assert.ok(errorMessage.includes("Tag names cannot be longer than 191 characters."), "Error: mensaje no es el esperado")
    } else if (id == '2') {
        let element = await this.driver.$('p.response:nth-child(1)');
        let errorMessage = await element.getText();
        return assert.ok(errorMessage.includes("You must specify a name for the tag.") , "Error: mensaje no es el esperado")
    } else if (id == '3') {
        let element = await this.driver.$('p.response:nth-child(2)');
        let errorMessage = await element.getText();
        return assert.ok(errorMessage.includes("The colour should be in valid hex format"), "Error: mensaje no es el esperado")
    } else if (id == '4') {
        let element = await this.driver.$('p.response:nth-child(4)');
        let errorMessage = await element.getText();
        return assert.ok(errorMessage.includes("URL cannot be longer than 191 characters."), "Error: mensaje no es el esperado")
    } else if (id == '5') {
        let element = await this.driver.$('p.response:nth-child(3)');
        let errorMessage = await element.getText();
        return assert.ok(errorMessage.includes("Description cannot be longer than 500 characters."), "Error: mensaje no es el esperado")
    }
});


Then('I verify the behavior while saving a Post {string}', async function(id){
    let element = await this.driver.$('div.gh-publish-cta > button > span:nth-child(1)');
    let isCreated = await element.isExisting();
    return assert.isTrue(isCreated,'No permite crear el post');
});

Then('I verify the behavior while saving a Post v2', async function(){
    return assert.exists(await this.driver.$('div.gh-publish-cta > button > span:nth-child(1)'),"existe el elemento")
});


Then('I verify the behavior of settings {string}', async function(id){
    if (id == '1') {
        let element = await this.driver.$('.gh-date-time-picker-error');
        let errorMessage = await element.getText();
        return assert.ok(errorMessage.includes("Invalid date format, must be YYYY-MM-DD"), "Error: mensaje no es el esperado")
    } else if (id == '2') {
        let element = await this.driver.$('.gh-date-time-picker-error');
        let errorMessage = await element.getText();
        return assert.ok(errorMessage.includes("Must be in format:") , "Error: mensaje no es el esperado")
    } else if (id == '3') {
        let element = await this.driver.$('div.form-group:nth-child(5) > p:nth-child(3)');
        let errorMessage = await element.getText();
        return assert.ok(errorMessage.includes("Excerpt cannot be longer than 300 characters."), "Error: mensaje no es el esperado")
    }
});

Then('I verify the behavior on update', async function(){
        let element = await this.driver.$('.gh-alert');
        let errorMessage = await element.getText();
        return assert.ok(errorMessage.includes("Validation failed: Title cannot be longer than 255 characters."), "Error: mensaje no es el esperado")
});



// API - Testing


Then('I should receive mock data', function () {
    // Add assertions to verify the response, e.g., status code, response body
    expect(this.response.status).to.equal(200);
    // Add more assertions as needed
});