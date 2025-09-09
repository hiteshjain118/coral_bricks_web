interface MockMessage {
  role: 'user' | 'agent';
  content: string;
  attachment?: any[];
  actions?: string[];
  code?: string;
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
    "1. **Cool Cars**: $2,194\n" +
    "2. **John Melton**: $750\n" +
    "3. **Travis Waldron**: $681.27\n" +
    "4. **Amy's Bird Sanctuary**: $567\n" +
    "5. **55 Twin Lane**: $54\n",
    actions: ['Inspect', 'Visualize'],
    attachment: [
      {
        type: 'table',
        rows: [
          ['Cool Cars', 2194],
          ['John Melton', 750],
          ['Travis Waldron', 681.27],
          ['Amy\'s Bird Sanctuary', 567],
        ],
        columns: ['Customer', 'Revenue']
      },
    ],
    code: `
async function run(context: { __userData: Record<string, any[]> }): Promise<Output> {
  const data = context.__userData;
  
  const customers = data['Invoice'];
  if (!customers) {
    return { error: 'No customers found' };
  }
  return customers.sort((a, b) => b.TotalAmt - a.TotalAmt);
}
    `
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
    content: "To answer your question about what \"Cool Cars\" purchased, I will extract the invoice details specifically for \"Cool Cars\" from the data we retrieved for June. Let's proceed with that."
  },
  {
    role: "agent" as const,
    content: "\"Cool Cars\" made the following purchases in June:\n\n" +
    "1. **Sod**: $1,750\n" +
    "2. **Installation Hours**: $400\n" +
    "3. **Sprinkler Pipes**: $24\n" +
    "4. **Sprinkler Heads**: $20\n",
    actions: ['Inspect', 'Visualize'],
    attachment: [
      {
        type: 'table',
        rows: [
            ['Sod', 1750],
            ['Installation Hours', 400],
            ['Sprinkler Pipes', 24],
            ['Sprinkler Heads', 20]
        ],
        columns: ['Item', 'Amount']
      }
    ],
    code: `
async function run(context: { __userData: Record<string, any[]> }): Promise<Output> {
  const data = context.__userData;
  
  const customers = data['Invoice'];
  if (!customers) {
    return { error: 'No customers found' };
  }
  return customers.sort((a, b) => b.TotalAmt - a.TotalAmt);
}
    `
  },
  {
    role: "agent" as const,
    content: "Is there anything else you'd like to do?"
  },
  {
    role: "user" as const,
    content: "Send this to me in an email."
  },
  {
    role: "agent" as const,
    content: "I have sent the report to your email. Please check your inbox."
  },
]

export default mockConvo;