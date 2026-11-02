import { module, test } from "qunit";
import {
  AUTO_GROUPS,
  canSeeViewCounts,
  parseGroupIds,
  safeCount,
  userInGroup,
} from "../../../discourse/lib/group-view-counts";

const moderator = { moderator: true, admin: false, staff: true, groups: [] };
const admin = { moderator: false, admin: true, staff: true, groups: [] };
const member = {
  moderator: false,
  admin: false,
  staff: false,
  trust_level: 2,
  groups: [{ id: 42, name: "team" }],
};

module("Group View Counts | Unit | parseGroupIds", function () {
  test("parses pipe strings, arrays and empty values", function (assert) {
    assert.deepEqual(parseGroupIds("2|3|42"), [2, 3, 42]);
    assert.deepEqual(parseGroupIds(["2", 3]), [2, 3]);
    assert.deepEqual(parseGroupIds(""), []);
    assert.deepEqual(parseGroupIds(null), []);
    assert.deepEqual(parseGroupIds("x|-1|7"), [7]);
  });
});

module("Group View Counts | Unit | userInGroup", function () {
  test("moderators group matches moderators only", function (assert) {
    assert.true(userInGroup(moderator, AUTO_GROUPS.moderators));
    assert.false(userInGroup(admin, AUTO_GROUPS.moderators));
    assert.false(userInGroup(member, AUTO_GROUPS.moderators));
  });

  test("staff group matches admins and moderators", function (assert) {
    assert.true(userInGroup(moderator, AUTO_GROUPS.staff));
    assert.true(userInGroup(admin, AUTO_GROUPS.staff));
    assert.false(userInGroup(member, AUTO_GROUPS.staff));
  });

  test("trust level groups compare against trust_level", function (assert) {
    assert.true(userInGroup(member, 12));
    assert.false(userInGroup(member, 13));
  });

  test("custom groups use the user's group list", function (assert) {
    assert.true(userInGroup(member, 42));
    assert.false(userInGroup(member, 43));
  });

  test("no user is in no group", function (assert) {
    assert.false(userInGroup(null, AUTO_GROUPS.everyone));
  });
});

module("Group View Counts | Unit | canSeeViewCounts", function () {
  test("anonymous visitors never see counts", function (assert) {
    assert.false(
      canSeeViewCounts({ user: null, resolved: true, configured: "0" })
    );
  });

  test("server-resolved membership wins over the client check", function (assert) {
    assert.false(
      canSeeViewCounts({ user: moderator, resolved: false, configured: "2" })
    );
    assert.true(
      canSeeViewCounts({ user: member, resolved: true, configured: "2" })
    );
  });

  test("falls back to configured IDs on older Discourse", function (assert) {
    assert.true(canSeeViewCounts({ user: moderator, configured: "2" }));
    assert.false(canSeeViewCounts({ user: admin, configured: "2" }));
    assert.true(canSeeViewCounts({ user: admin, configured: "1|2" }));
    assert.false(canSeeViewCounts({ user: member, configured: "" }));
  });
});

module("Group View Counts | Unit | safeCount", function () {
  test("rejects missing, negative and non-numeric counts", function (assert) {
    assert.strictEqual(safeCount(undefined), null);
    assert.strictEqual(safeCount("abc"), null);
    assert.strictEqual(safeCount(-1), null);
    assert.strictEqual(safeCount(0), 0);
    assert.strictEqual(safeCount("12.6"), 13);
  });
});
