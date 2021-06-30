import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class ToggleComponent extends Component {
  @tracked archived = false;

  constructor() {
    super(...arguments);
    console.log('initializing');
  }

  @action
  toggleArchived(record, id) {
    const _user = record.serialize().data.attributes;

    const message = `Confirm to ${
      !_user.archived ? 'Archive' : 'Unarchive'
    } user`;

    if (!window.confirm(message)) return;

    this.updateUser(id, _user).then(() => {
      record.set('archived', !_user.archived);
    });
  }

  async updateUser(id, user) {
    const headers = {
      method: 'PATCH',
      body: JSON.stringify(user),
      headers: {
        'content-type': 'application/json',
      },
    };

    const promise = await fetch(`/api/users/${id}`, headers);
    const data = promise.json();

    return data;
  }
}
