const { Given, When, Then } = require('@cucumber/cucumber');
const { faker } = require('@faker-js/faker');
const { By, browser, Key, Builder } = require('webdriverio');
const assert = require('assert');


var title = ""

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
    title = faker.lorem.lines(1)
    console.log(title)
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

// Post Modification
// ------------------------------------------------
When('I click Published', async function() {
    let element = await this.driver.$('.gh-nav-view-list > li:nth-child(3)');
    return await element.click();
});

When('I select a published post', async function() {
    let element = await this.driver.$('div.gh-posts-list-item-group:nth-child(1)');
    return await element.click();
});

When('I click title', async function() {
    let element = await this.driver.$('div.gh-editor-title-container.page-improvements');
    return await element.click();
});

When('I click the Update button', async function() {
    let element = await this.driver.$('.darkgrey > span:nth-child(1)');
    return await element.click();
});

When('I go back to Posts', async function() {
    let element = await this.driver.$('a.ember-view.gh-btn-editor.gh-editor-back-button > span');
    return await element.click();
});

// ----------------------------------------------------------------------------------------------------------------


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

// Page Modification
// ------------------------------------------------------


// ----------------------------------------------------------------------------------------------------------------


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
    return await element.setValue(faker.random.numeric(6));
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

// Tag Modification
// ------------------------------------------------------


// ----------------------------------------------------------------------------------------------------------------



// ----------------------------------------------------------------------------------------------------------------
// Member Creation
// ----------------------------------------------------------------------------------------------------------------
When('I click Members', async function() {
    let element = await this.driver.$('body > div.gh-app > div > nav.gh-nav > div > section > div.gh-nav-top > ul.gh-nav-list.gh-nav-manage > li:nth-child(4)');
    return await element.click();
});

When('I click New member', async function() {
    let element = await this.driver.$('ember-view.gh-btn.gh-btn-primary > span');
    return await element.click();
});

When('I enter member name', async function () {
    let element = await this.driver.$('#member-name');
    return await element.setValue(faker.name());
});

When('I enter member email', async function () {
    let element = await this.driver.$('#member-email');
    return await element.setValue(faker.internet.email());
});

When('I enter member note', async function () {
    let element = await this.driver.$('#member-note');
    return await element.setValue(faker.lorem.sentence(10));
});

When('I click Save member', async function() {
    let element = await this.driver.$('gh-btn gh-btn-primary gh-btn-icon ember-view > span');
    return await element.click();
});

// Member Modification
// ------------------------------------------------------


// ----------------------------------------------------------------------------------------------------------------



// ----------------------------------------------------------------------------------------------------------------
// Settings
// ------------------------------------------------------


// ----------------------------------------------------------------------------------------------------------------

When('I click Settings', async function() {
    let element = await this.driver.$('body > div.gh-app > div > main > button > span');
    return await element.click();
});

When('I go back to editor', async function() {
    let element = await this.driver.$('button.gh-back-to-editor > span');
    return await element.click();
});

// ----------------------------------------------------------------------------------------------------------------
// Validation
// ----------------------------------------------------------------------------------------------------------------

Then('I verify that my post has been created', async function(){
    let element = await this.driver.$('div.gh-posts-list-item-group:nth-child(1)');
    assert.ok(element, 'El elemento no se encontró');
});
