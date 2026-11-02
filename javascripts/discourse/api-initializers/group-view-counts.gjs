import { apiInitializer } from "discourse/lib/api";
import PostReadCount from "../components/post-read-count";
import TopicViewCount from "../components/topic-view-count";

const POST_INFO_KEY = "group_view_counts";

export default apiInitializer((api) => {
  // Topic views: one badge in the admin-chosen topic outlet.
  if (settings.show_topic_views) {
    api.renderInOutlet(settings.topic_views_outlet, TopicViewCount);
  }

  // Post reads: a new item in the post meta-data row, before the date.
  // Uses the Glimmer post stream DAG. Skipped quietly on versions without it.
  if (settings.show_post_reads) {
    try {
      api.registerValueTransformer(
        "post-meta-data-infos",
        ({ value: dag, context }) => {
          dag.add(POST_INFO_KEY, PostReadCount, {
            before: context?.metaDataInfoKeys?.DATE,
          });
        }
      );
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn(
        "[group-view-counts] post reads need the Glimmer post stream",
        error
      );
    }
  }
});
