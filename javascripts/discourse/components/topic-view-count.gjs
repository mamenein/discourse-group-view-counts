import Component from "@glimmer/component";
import ViewCountBadge from "./view-count-badge";

/** Rendered in the topic outlet chosen in `topic_views_outlet`. */
export default class TopicViewCount extends Component {
  get topic() {
    return this.args.outletArgs?.model;
  }

  <template>
    {{#if settings.show_topic_views}}
      <div class="group-view-counts-topic">
        <ViewCountBadge @kind="topic" @count={{this.topic.views}} />
      </div>
    {{/if}}
  </template>
}
