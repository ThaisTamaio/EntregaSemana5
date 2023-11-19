const { Given, When, Then } = require('@cucumber/cucumber');
const { faker } = require('@faker-js/faker');
const { By, browser, Key, Builder } = require('webdriverio');
const assert = require('assert');


var title = ""

// ----------------------------------------------------------------------------------------------------------------
// Login
// ----------------------------------------------------------------------------------------------------------------
When('I enter email {kraken-string} on new version', async function (email) {
    let element = await this.driver.$('input.email.ember-text-field.gh-input.ember-view');
    return await element.setValue(email);
});

When('I enter password {kraken-string} on new version', async function (password) {
    let element = await this.driver.$('input.password.ember-text-field.gh-input.ember-view');
    return await element.setValue(password);
});

When('I click login on new version', async function() {
    let element = await this.driver.$('#ember12');
    return await element.click();
});

// ----------------------------------------------------------------------------------------------------------------
// Post Creation
// ----------------------------------------------------------------------------------------------------------------
When('I click Posts on new version', async function() {
    let element = await this.driver.$('body > div.gh-app > div > nav.gh-nav > div > section > div.gh-nav-top > ul.gh-nav-list.gh-nav-manage > li:nth-child(2)');
    return await element.click();
});

When('I click new post on new version', async function() {
    let element = await this.driver.$('a.ember-view.gh-secondary-action.gh-nav-new-post > span');
    return await element.click();
});

When('I enter title on new version', async function () {
    let element = await this.driver.$('textarea.gh-editor-title.ember-text-area.gh-input.ember-view');
    title = faker.lorem.lines(1)
    console.log(title)
    return await element.setValue(title);
});

When('I enter paragraphs on new version', async function () {
    let element = await this.driver.$('div.koenig-editor__editor-wrapper > div');
    return await element.setValue(faker.lorem.paragraphs()+'\n');
});

When('I click add card on new version', async function() {
    let element = await this.driver.$('button.koenig-plus-menu-button.flex.justify-center.items-center.relative.w9.h9.ba.b--midlightgrey-l2.bg-white.br-100.anim-normal');
    return await element.click();
});

When('I click image on new version', async function() {
    let element = await this.driver.$('div.flex-shrink-0:nth-child(2) > div:nth-child(2)');
    return await element.click();
});

When('I click the Publish button on new version', async function() {
    let element = await this.driver.$('div.gh-publishmenu.ember-view');
    return await element.click();
});

When('I publish on new version', async function() {
    let element = await this.driver.$('button.gh-btn.gh-btn-blue.gh-publishmenu-button.gh-btn-icon.ember-view');
    return await element.click();
});

When('I confirm the publish on new version', async function() {
    let element = await this.driver.$('div.flex.items-center.pl4.pr4.f8.nudge-left--1.h9.br2.br--right.bg-white > span');
    return await element.click();
});

// ------------------------------------------------
// Post Modification
// ------------------------------------------------
When('I click Published on new version', async function() {
    let element = await this.driver.$('.gh-nav-view-list > li:nth-child(3)');
    return await element.click();
});

When('I select a published post on new version', async function() {
    let element = await this.driver.$('div.gh-posts-list-item-group:nth-child(1)');
    return await element.click();
});

When('I click title on new version', async function() {
    let element = await this.driver.$('div.gh-editor-title-container.page-improvements');
    return await element.click();
});

When('I click the Update button on new version', async function() {
    let element = await this.driver.$('.darkgrey > span:nth-child(1)');
    return await element.click();
});

When('I go back to Posts on new version', async function() {
    let element = await this.driver.$('a.blue.link.fw4.flex.items-center.ember-view');
    return await element.click();
});

// ----------------------------------------------------------------------------------------------------------------
// Page Creation
// ----------------------------------------------------------------------------------------------------------------
When('I click Pages on new version', async function() {
    let element = await this.driver.$('body > div.gh-app > div > nav.gh-nav > div > section > div.gh-nav-top > ul.gh-nav-list.gh-nav-manage > li:nth-child(2)');
    return await element.click();
});

When('I click New Page on new version', async function() {
    let element = await this.driver.$('a.ember-view.gh-btn.gh-btn-primary.view-actions-top-row > span');
    return await element.click();
});

When('I go back to Pages on new version', async function() {
    let element = await this.driver.$('a.ember-view.gh-btn-editor.gh-editor-back-button > span');
    return await element.click();
});
// ------------------------------------------------------
// Page Modification
// ------------------------------------------------------



// ----------------------------------------------------------------------------------------------------------------
// Tag Creation
// ----------------------------------------------------------------------------------------------------------------
When('I click Tags on new version', async function() {
    let element = await this.driver.$('body > div.gh-app > div > nav.gh-nav > div > section > div.gh-nav-top > ul.gh-nav-list.gh-nav-manage > li:nth-child(3)');
    return await element.click();
});

When('I click new Tag on new version', async function() {
    let element = await this.driver.$('a.ember-view.gh-btn.gh-btn-primary > span:nth-child(1)');
    return await element.click();
});

When('I enter Tag Name on new version', async function () {
    let element = await this.driver.$('#tag-name');
    return await element.setValue(faker.animal.bird());
});

When('I enter Tag Color on new version', async function () {
    let element = await this.driver.$('body > div.gh-app > div > main > section > form > div.gh-main-section > section > div > div:nth-child(1) > div.gh-tag-settings-multiprop > div.form-group.gh-tag-settings-colorcontainer > div > input');
    return await element.setValue(faker.random.numeric(6));
});

When('I enter Tag Description on new version', async function () {
    let element = await this.driver.$('#tag-description');
    return await element.setValue(faker.lorem.sentence(10));
});

When('I click Save Tag on new version', async function() {
    let element = await this.driver.$('section.view-actions > button');
    return await element.click();
});

When('I click on Tags on new version', async function() {
    let element = await this.driver.$('input.ember-power-select-trigger-multiple-input');
    return await element.click();
});

When('I select a Tag on new version', async function() {
    let element = await this.driver.$('li.ember-power-select-option:nth-child(2)');
    return await element.click();
});

When('I select another Tag on new version', async function() {
    let element = await this.driver.$('li.ember-power-select-option:nth-child(3)');
    return await element.click();
});
// ------------------------------------------------------
// Tag Modification
// ------------------------------------------------------



// ----------------------------------------------------------------------------------------------------------------
// Member Creation
// ----------------------------------------------------------------------------------------------------------------
When('I click Members on new version', async function() {
    let element = await this.driver.$('body > div.gh-app > div > nav.gh-nav > div > section > div.gh-nav-top > ul.gh-nav-list.gh-nav-manage > li:nth-child(4)');
    return await element.click();
});

When('I click New member on new version', async function() {
    let element = await this.driver.$('ember-view.gh-btn.gh-btn-primary > span');
    return await element.click();
});

When('I enter member name on new version', async function () {
    let element = await this.driver.$('#member-name');
    return await element.setValue(faker.name());
});

When('I enter member email on new version', async function () {
    let element = await this.driver.$('#member-email');
    return await element.setValue(faker.internet.email());
});

When('I enter member note on new version', async function () {
    let element = await this.driver.$('#member-note');
    return await element.setValue(faker.lorem.sentence(10));
});

When('I click Save member on new version', async function() {
    let element = await this.driver.$('gh-btn gh-btn-primary gh-btn-icon ember-view > span');
    return await element.click();
});

When('I go back to Members on new version', async function() {
    let element = await this.driver.$('.members_svg__cls-1');
    return await element.click();
});

Then('I verify that a member has been created on new version', async function(){
    let element = await this.driver.$('.ma0.pa0.gh-members-list-name');
    assert.ok(element, 'El elemento no se encontró');
});

// ----------------------------------------------------------------------------------------------------------------
// Settings
// ------------------------------------------------------

When('I click Settings on new version', async function() {
    let element = await this.driver.$('.post-settings');
    return await element.click(); 
});
When('I close Settings on new version', async function() {
    let element = await this.driver.$('.close');
    return await element.click()
});

When('I go back to editor on new version', async function() {
    let element = await this.driver.$('div.flex.items-center.pl4.pr4.f8.nudge-left--1.h9.br2.br--right.bg-white > span');
    return await element.click();
});

// ----------------------------------------------------------------------------------------------------------------
// Validation
// ----------------------------------------------------------------------------------------------------------------

Then('I verify that my post has been created on new version', async function(){
    let element = await this.driver.$('ol.posts-list.gh-list:nth-child(1)');
    assert.ok(element, 'El elemento no se encontró');
});
