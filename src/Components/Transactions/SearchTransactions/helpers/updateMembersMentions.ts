import { BeautifulMentionsItem } from "lexical-beautiful-mentions";

export function updateMembersMentions(
  fetchedMembers: { value: string; memberId: string }[],
  mentionItems: Record<string, BeautifulMentionsItem[]>
) {
  fetchedMembers.forEach((member) => {
    mentionItems["payer:"].push({
      value: member.value,
      id: parseInt(member.memberId),
    });

    mentionItems["participant:"].push({
      value: member.value,
      id: parseInt(member.memberId),
    });
    mentionItems["sender:"].push({
      value: member.value,
      id: parseInt(member.memberId),
    });
    mentionItems["receiver:"].push({
      value: member.value,
      id: parseInt(member.memberId),
    });
  });
}
