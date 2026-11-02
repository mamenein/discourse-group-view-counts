import Component from "@glimmer/component";
import ViewCountBadge from "./view-count-badge";

/** Added to the post meta-data row (next to the date) via the DAG transformer. */
export default class PostReadCount extends Component {
  <template><ViewCountBadge @kind="post" @count={{@post.reads}} /></template>
}
