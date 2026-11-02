/**
 * Pure helpers for Group View Counts.
 * No Ember imports here, so every rule is unit-testable.
 */

/** Discourse automatic group IDs (Group::AUTO_GROUPS). */
export const AUTO_GROUPS = Object.freeze({
  everyone: 0,
  admins: 1,
  moderators: 2,
  staff: 3,
  anonymous_users: 4,
  logged_in_users: 5,
  trust_level_0: 10,
  trust_level_4: 14,
});

/**
 * @typedef {object} ViewerLike
 * @property {boolean} [admin]
 * @property {boolean} [moderator]
 * @property {boolean} [staff]
 * @property {number} [trust_level]
 * @property {{ id: number, name?: string }[]} [groups]
 */

/**
 * Group list settings arrive as "1|2|3", an array, or empty.
 * @param {string|number[]|string[]|null|undefined} value
 * @returns {number[]}
 */
export function parseGroupIds(value) {
  if (value == null || value === "") {
    return [];
  }
  const parts = Array.isArray(value) ? value : String(value).split("|");
  return parts
    .map((part) => parseInt(String(part).trim(), 10))
    .filter((id) => Number.isInteger(id) && id >= 0);
}

/**
 * Client-side membership check. Automatic groups are derived from user flags,
 * because the current-user payload does not always list them in `groups`.
 * @param {ViewerLike|null|undefined} user
 * @param {number} groupId
 * @returns {boolean}
 */
export function userInGroup(user, groupId) {
  if (!user) {
    return false;
  }
  const isAdmin = !!user.admin;
  const isModerator = !!user.moderator;

  switch (groupId) {
    case AUTO_GROUPS.everyone:
    case AUTO_GROUPS.logged_in_users:
      return true;
    case AUTO_GROUPS.anonymous_users:
      return false;
    case AUTO_GROUPS.admins:
      return isAdmin;
    case AUTO_GROUPS.moderators:
      return isModerator;
    case AUTO_GROUPS.staff:
      return !!user.staff || isAdmin || isModerator;
  }

  if (
    groupId >= AUTO_GROUPS.trust_level_0 &&
    groupId <= AUTO_GROUPS.trust_level_4
  ) {
    return (user.trust_level ?? 0) >= groupId - AUTO_GROUPS.trust_level_0;
  }

  return (user.groups || []).some((group) => group?.id === groupId);
}

/**
 * The one visibility rule for every surface.
 *
 * - Anonymous visitors never see counts.
 * - If the server resolved membership (resolve_group_membership), trust it.
 * - Otherwise (older Discourse), check the configured IDs in the browser.
 *
 * @param {object} input
 * @param {ViewerLike|null|undefined} input.user
 * @param {boolean|undefined} input.resolved settings.user_in_visible_to_groups
 * @param {string|number[]|undefined} input.configured settings.visible_to_groups
 * @returns {boolean}
 */
export function canSeeViewCounts({ user, resolved, configured }) {
  if (!user) {
    return false;
  }
  if (typeof resolved === "boolean") {
    return resolved;
  }
  return parseGroupIds(configured).some((id) => userInGroup(user, id));
}

/**
 * Counts can be missing on partial models. Never render NaN or negatives.
 * @param {unknown} value
 * @returns {number|null}
 */
export function safeCount(value) {
  const n = Number(value);
  if (!Number.isFinite(n) || n < 0) {
    return null;
  }
  return Math.round(n);
}
