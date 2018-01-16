import differenceInMilliseconds from 'date-fns/difference_in_milliseconds';

export function formatEventsToRender(events = []) {
  return events
    .filter(({ event }) => event !== 'mentioned' && event !== 'subscribed')
    .filter(({ event }, index, list) => {
      if (index === 0) {
        return true;
      }

      // Merge events are always followed by a closed event, but we don't
      // want to render them.
      if (event === 'closed' && list[index - 1].event === 'merged') {
        return false;
      }

      return true;
    })
    .reduce((results, event, index, list) => {
      // Label events are recorded individually, but we want to group them for display
      const labelEvents = ['labeled', 'unlabeled'];
      const prevEvent = index > 0 ? list[index - 1] : {};

      if (
        index > 0 &&
        labelEvents.includes(event.event) &&
        labelEvents.includes(prevEvent.event) &&
        differenceInMilliseconds(event.created_at, prevEvent.created_at) <
          10000 &&
        event.actor.login === prevEvent.actor.login
      ) {
        const labelGroup = results[results.length - 1];

        if (event.event === 'labeled') {
          labelGroup.labeled.push(event);
        } else {
          labelGroup.unlabeled.push(event);
        }
      } else if (labelEvents.includes(event.event)) {
        const labelGroup = {
          event: 'label-group',
          labeled: [],
          unlabeled: [],
          created_at: event.created_at,
          actor: event.actor,
        };

        if (event.event === 'labeled') {
          labelGroup.labeled.push(event);
        } else {
          labelGroup.unlabeled.push(event);
        }

        results.push(labelGroup);
      } else {
        results.push(event);
      }

      return results;
    }, []);
}
