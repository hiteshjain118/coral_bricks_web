interface MockMessage {
  role: 'user' | 'agent';
  content: string;
  attachments?: any[];
}

export const mockConvo: MockMessage[] = 
[
  {
    role: "agent" as const,
    content: "Hi! What data questions do you have?"
  },
  {
    role: "user" as const,
    content: "Show me top 5 customers by revenue for month of June."
  },
  {
    role: "agent" as const,
    content: "To find the top 5 customers by revenue for the month of June, we can use the \"Invoice\" table from your \"Quickbooks\" data. Here's the query plan:\n\n" +
    "1. **Table**: Invoice\n" +
    "2. **Fields**:\n" +
    "- CustomerRef.name (to identify the customer)\n" +
    "- TotalAmt (to calculate the revenue)\n" +
    "- TxnDate (to filter for the month of June)\n" +
    "We'll filter the data to only include invoices within the month of June. \n" +
    "Let's proceed with this plan. Please confirm if you'd like to proceed or if there are any additional filters or requirements you want to include."
  },
  {
    role: "user" as const,
    content: "Yes, go ahead"
  },
  {
    role: "agent" as const,
    content: "Here are the top 5 customers by revenue for the month of June:\n\n" +
    "1. **Amy's Bird Sanctuary**: $567\n" +
    "2. **Cool Cars**: $2,194\n" +
    "3. **55 Twin Lane**: $54\n" +
    "4. **John Melton**: $750\n" +
    "5. **Travis Waldron**: $681.27\n"
  },
  {
    role: "agent" as const,
    content: "Is there anything else you'd like to do?"
  },
  {
    role: "user" as const,
    content: "what did Cool Cars buy?"
  },
  {
    role: "agent" as const,
    content: "\"Cool Cars\" made the following purchases in June:\n\n" +
    "1. **Sprinkler Heads**: $20\n" +
    "2. **Sprinkler Pipes**: $24\n" +
    "3. **Sod**: $1,750\n" +
    "4. **Installation Hours**: $400\n"
  },
]

export default mockConvo;