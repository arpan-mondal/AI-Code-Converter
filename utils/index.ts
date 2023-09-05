import endent from 'endent';
import {
  createParser,
  ParsedEvent,
  ReconnectInterval,
} from 'eventsource-parser';

const createPrompt = (
  inputLanguage: string,
  outputLanguage: string,
  inputCode: string,
  option: string,
  outputNaturalLanguage: string
) => {
  if(option === 'optimize') {
  	return endent`
	  You are an expert programmer in all programming languages. Especially good at "${outputLanguage}" language code.
  	  You will be provided with a piece of "${inputLanguage}" code, and your task is to provide ideas for efficiency improvements.
	  And at last, you should return the optimized code, And with detailed annotations that reflect optimisations.
	  
	  the code:
	  ${inputCode}.
	  
	  You must Response in "${outputNaturalLanguage}".
  	 `;
  } else if (option === 'explain') {
    return endent`
	  You are an expert programmer in all programming languages. Especially good at "${outputLanguage}" language code.
      You will be provided with a piece of "${inputLanguage}" code, and your task is to explain it.
	  You only reply to the content related to the program, you do not need to reply to other topics；
	  
	  Example Explain the code in Java Program;
	  
	  The code:
	  public class Sum {
	      public static void main(String[] args) {
	          int sum = 0;
	          for (int i = 1; i <= 10; i++) {
	              sum += i;
	          }
	          System.out.println("The sum is: " + sum);
	      }
	  }
	  
	  The explain:
	  The code you've provided is a Java program that calculates the sum of the numbers from 1 to 10 using a loop and then prints out the result. Let's break down the code step by step:
	  
	  1. \`public class Sum {\`: This line declares the start of a Java class named \`Sum\`.
	  
	  2. \`public static void main(String[] args) {\`: This is the main method of the program, which serves as the entry point for execution. The program starts running from here.
	  
	  3. \`int sum = 0;\`: This initializes a variable named \`sum\` to 0. This variable will be used to store the cumulative sum of the numbers.
	  
	  4. \`for (int i = 1; i <= 10; i++) {\`: This line starts a \`for\` loop that iterates from \`i = 1\` to \`i = 10\` (inclusive). The loop increments \`i\` by 1 in each iteration.
	  
	  5. Inside the loop:
	     - \`sum += i;\`: This statement adds the current value of \`i\` to the \`sum\` variable. Essentially, it's accumulating the values of \`i\` as the loop iterates.
	  
	  6. \`}\`: This closes the \`for\` loop.
	  
	  7. \`System.out.println("The sum is: " + sum);\`: After the loop has finished, this line prints the calculated sum to the console. It uses string concatenation to combine the text "The sum is: " with the value of the \`sum\` variable.
	  
	  8. \`}\`: This closes the \`main\` method.
	  
	  9. \`}\`: This closes the \`Sum\` class.
	  
	  In summary, the program calculates the sum of the numbers from 1 to 10 using a \`for\` loop and prints the result to the console. The output will be: "The sum is: 55" since 1 + 2 + ... + 10 equals 55.
	  
	  The code:
	  ${inputCode}.
	  
	  You must Response in "${outputNaturalLanguage}".
	  
	  The explain:
	  
     `;
  } else if (option === 'ask') {
	  return endent`
	  You are an expert programmer in all programming languages. Especially good at "${outputLanguage}" language code.
	  give you a question，and you provide me with Code and so on only related with program；
	  You only reply to the content related to the program, you do not need to reply to other topics；
	  
	  Example Answer the question in JavaScript program:
	  
	  Question:
	  what is JavaScript?
	  
	  Answer:
	  JavaScript is a widely used programming language primarily known for its role in web development. It was originally created by Netscape as a client-side scripting language to enhance web pages with interactivity and dynamic behavior. Over time, JavaScript has evolved significantly and is now used not only on the client side but also on the server side through technologies like Node.js.
	  
	  Key features and uses of JavaScript include:
	  
	  1. Client-Side Scripting: JavaScript is commonly used to add interactivity and dynamic content to websites. It can manipulate HTML and CSS, respond to user actions, and create visually appealing effects.
	  
	  2. Web Development: JavaScript is a core technology in modern web development. It's used to create complex web applications, interactive forms, animations, and much more.
	  
	  3. Cross-Platform: JavaScript can be executed in various web browsers, making it a cross-platform language. This means that you can write code once and have it run on different browsers without major modifications.
	  
	  4. Server-Side Scripting: With the advent of Node.js, JavaScript can now be used for server-side scripting as well. This allows developers to create scalable and efficient network applications.
	  
	  5. Asynchronous Programming: JavaScript's event-driven, non-blocking architecture makes it well-suited for asynchronous programming. This is crucial for handling tasks such as fetching data from servers without blocking the entire program's execution.
	  
	  6. Libraries and Frameworks: There are numerous libraries and frameworks built on top of JavaScript that streamline and simplify various aspects of web development. Examples include React, Angular, and Vue.js for building user interfaces, and Express.js for server-side development.
	  
	  7. JSON (JavaScript Object Notation): JSON is a widely used data format that is easy for both humans and machines to understand. It's often used for exchanging data between a server and a web application and is based on a subset of JavaScript syntax.
	  
	  8. Extensibility: You can extend the functionality of web browsers by creating browser extensions and add-ons using JavaScript.
	  
	  9. Interactive Games: JavaScript can be used to create browser-based games, ranging from simple puzzles to more complex 3D experiences.
	  
	  It's important to note that while JavaScript shares a similar name with Java, they are two distinct programming languages with different syntax, purposes, and use cases.
	  
	  Question:
	  ${inputCode}.
	  
	  You must Response in "${outputNaturalLanguage}".
	  
	  Answer:
	  
	  `;
  } else {
    return endent`
    You are an expert programmer in all programming languages. 
	Especially good at "${outputLanguage}" language code.
	Translate the "${inputLanguage}" to "${outputLanguage}" code.
    
    Given the prompt,generate the code,The code should be formatted for readability.And The code must be correct and the more detailed and complete it is the better.
    Example translating from Natural Language to JavaScript:
    
    <Natural Language>
    Print the numbers 0 to 9.
    </Natural Language>
    
    <The JavaScript Code>
    for (let i = 0; i < 10; i++) {
      console.log(i);
    }
    </The JavaScript Code>
    
    Natural Language:
    ${inputCode}.
    
    You must Response in "${outputNaturalLanguage}".Only return the Code. And The Code Do not include \`\`\`.
    
    The ${outputLanguage} Code (no \`\`\`):
    `;
  }
};

export const OpenAIStream = async (
  inputLanguage: string,
  outputLanguage: string,
  inputCode: string,
  option: string,
  outputNaturalLanguage: string
) => {
	const prompt = createPrompt(inputLanguage, outputLanguage, inputCode, option, outputNaturalLanguage);

	const system = { role: 'system', content: prompt };
	console.info('system : ', system);
	// use openai 
	const url = "https://api.openai.com/v1/chat/completions";
	const apiKeysString = process.env.NEXT_PUBLIC_OPENAI_API_KEY_ARRAY || "";
	const keyArray = apiKeysString.split(',');
	const model = "gpt-3.5-turbo-16k";

	const getNextApiKey = () => {
		const now = new Date();
		const seconds = Math.floor(now.getTime() / 1000);
		let currentKeyIndex = seconds % keyArray.length;
		let curKey = keyArray[currentKeyIndex];
		console.info(`use key: ${curKey}, keyIndex: ${currentKeyIndex}`);
		return curKey;
	};
	const key = getNextApiKey();
  // use fake
  // const url = "https://ai.fakeopen.com/v1/chat/completions";
  // const key = "pk-this-is-a-real-free-pool-token-for-everyone";
  // const model = "gpt-4";
  // use api2d
  // const url = "https://oa.api2d.net/v1/chat/completions";
  // const key = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
  // const model = "gpt-3.5-turbo-16k";
  
  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${key}`,
    },
    method: 'POST',
    body: JSON.stringify({
      model,
      messages: [system],
      temperature: 0,
      stream: true,
    }),
  });

  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  if (res.status !== 200) {
    const statusText = res.statusText;
    const result = await res.body?.getReader().read();
    throw new Error(
      `OpenAI API returned an error: ${
        decoder.decode(result?.value) || statusText
      }`,
    );
  }

  const stream = new ReadableStream({
    async start(controller) {
      const onParse = (event: ParsedEvent | ReconnectInterval) => {
        if (event.type === 'event') {
          const data = event.data;

          if (data === '[DONE]') {
            controller.close();
            return;
          }

          try {
            const json = JSON.parse(data);
            const text = json.choices[0].delta.content;
            const queue = encoder.encode(text);
            controller.enqueue(queue);
          } catch (e) {
            controller.error(e);
          }
        }
      };

      const parser = createParser(onParse);

      for await (const chunk of res.body as any) {
        parser.feed(decoder.decode(chunk));
      }
    },
  });

  return stream;
};
