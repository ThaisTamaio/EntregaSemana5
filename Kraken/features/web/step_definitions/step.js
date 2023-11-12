const { Given, When, Then } = require('@cucumber/cucumber');
const { faker } = require('@faker-js/faker');
const { Key } = require('webdriverio');
const path = require('path');
const filePath = path.join(__dirname, '/home/elcidcampeador/Documents/MISO/Semestre_1/MISW-4103/Proyecto/ghost/content/images/2023/11/Foto.png');

// Login
// ------------------------------------------------
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
// ------------------------------------------------

// Post Creation
// ------------------------------------------------
When('I click new post', async function() {
    let element = await this.driver.$('#ember20');
    return await element.click();
});

When('I enter title', async function () {
    let element = await this.driver.$('div.gh-editor-title-container.page-improvements');
    return await element.setValue(faker.lorem.lines(1));
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

/* 
Not working
----------------------------
When('I upload image', async function() {
    let element = await this.driver.$('.upload-data-file-input');
    return await element.setValue(remoteFilePath);
});
----------------------------
*/ 

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
// ------------------------------------------------