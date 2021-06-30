import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import click from '@ember/test-helpers/dom/click';

module('Acceptance | toggle', function (hooks) {
  setupApplicationTest(hooks);

  test('should toggle archived', async function (assert) {
    await visit('/users/1');

    await click('[data-test-toggle-archived]');
    assert.dom('[data-test-toggle-archived]').hasText('Archived');

    await this.pauseTest();
    assert.equal(currentURL(), '/users/1');
  });
});
