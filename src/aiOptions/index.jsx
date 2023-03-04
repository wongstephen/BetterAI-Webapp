export const arrayItems = [
  {
    name: "Q&A",
    id: "q&a",
    description: "Answer questions based on existing knowledge.",
    option: {
      model: "text-davinci-003",
      prompt: "",
      temperature: 0,
      max_tokens: 64,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    },
  },
  {
    name: "Grammer Correction",
    id: "grammerCorrection",
    description: "Corrects sentences into standard English.",
    option: {
      model: "text-davinci-003",
      prompt: "Correct this to standard English: ",
      temperature: 0,
      max_tokens: 60,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    },
  },
  {
    name: "TL:DR summarization",
    id: "tldr",
    description:
      "Summarize text by adding a 'tl;dr:' to the end of a text passage.",
    option: {
      model: "text-davinci-003",
      prompt: "tl;dr: \n",
      temperature: 0,
      max_tokens: 60,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    },
  },
  {
    name: "Keywords",
    id: "keywords",
    description: "Extract keywords from a block of text.",
    option: {
      model: "text-davinci-003",
      prompt: "Extract keywords from this text:\n",
      temperature: 0.5,
      max_tokens: 60,
      top_p: 1.0,
      frequency_penalty: 0.8,
      presence_penalty: 0.0,
    },
  },
];
