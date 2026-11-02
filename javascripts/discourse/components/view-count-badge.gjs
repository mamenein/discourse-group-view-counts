import Component from "@glimmer/component";
import { service } from "@ember/service";
import { trustHTML } from "@ember/template";
import { number } from "discourse/lib/formatter";
import { iconHTML } from "discourse/lib/icon-library";
import { i18n } from "discourse-i18n";
import { canSeeViewCounts, safeCount } from "../lib/group-view-counts";

/**
 * One badge for every surface.
 *
 * @arg {"topic"|"post"} kind
 * @arg {unknown} count  topic.views or post.reads
 */
export default class ViewCountBadge extends Component {
  @service currentUser;

  get visible() {
    return (
      canSeeViewCounts({
        user: this.currentUser,
        resolved: settings.user_in_visible_to_groups,
        configured: settings.visible_to_groups,
      }) && this.count !== null
    );
  }

  get count() {
    return safeCount(this.args.count);
  }

  get kind() {
    return this.args.kind === "post" ? "post" : "topic";
  }

  get iconHtml() {
    return trustHTML(iconHTML("eye"));
  }

  get shortNumber() {
    return number(this.count);
  }

  get label() {
    const key = this.kind === "post" ? "post_reads" : "topic_views";
    return i18n(themePrefix(key), { count: this.count });
  }

  /** Topic: "1,234 views". Post: compact "1.2k" next to the date. */
  get text() {
    return this.kind === "post" ? this.shortNumber : this.label;
  }

  get title() {
    return `${this.label} · ${i18n(themePrefix("restricted_hint"))}`;
  }

  <template>
    {{#if this.visible}}
      <span
        class="group-view-counts group-view-counts--{{this.kind}}"
        title={{this.title}}
        aria-label={{this.label}}
      >
        {{this.iconHtml}}
        <span class="group-view-counts__text">{{this.text}}</span>
      </span>
    {{/if}}
  </template>
}
