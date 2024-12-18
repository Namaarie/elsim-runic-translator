'use client';
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  let runes: (string | string[])[] = []
  
  const [rune_images, set_rune_images] = useState<string[]>([]);

  const parse = (e: any) => {
    e.preventDefault()
    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);
    const sentence: string = formProps["sentence"].toString();
    console.log(sentence);

    runes = [];
    set_rune_images([]);

    const consonants2 = "mnptkswlj "
    const vowels = "aeiou"
    
    let i = 0;
    while (i < sentence.length) {
      if (sentence[i] == " ") {
        runes.push("divide")
        i += 1
      }
      if (vowels.includes(sentence[i])) {
        runes.push(sentence[i] + sentence[i+1] + " inverse")
        //runes.push("di");
        i += 1
      } else {
        // expect a consonant, and got a consonant
        if (sentence[i+1] == undefined) {
          if (runes[runes.length-1].includes(sentence[i])){
            break;
          } else {
            runes.push(sentence[i-1] + sentence[i] + " inverse");
            break
          }
          break;
        } else if (sentence[i+1] == " ") {
          if (runes[runes.length-1].includes(sentence[i])){
            runes.push("divide");
            i += 2
          } else {
            runes.push(sentence[i-1] + sentence[i] + " inverse")
              runes.push("divide");
            i += 2
          }
        } else if(consonants2.includes(sentence[i]) && consonants2.includes(sentence[i+1])) {
          // both are consonants, so need first one back
          runes.push(sentence[i-1] + sentence[i] + " inverse")
          i += 1
        }
        else {
          runes.push(sentence[i] + sentence[i+1])
          i += 2
        }
      }
    }

    const r = [];
    for (let i = 0; i < runes.length; i++) {
      if (vowels.includes(runes[i][0])) {
        const new_rune = "/" + runes[i][1].toUpperCase() + runes[i][0] + ".png";
        const inverse = "/In.png";
        r.push(new_rune);
        r.push(inverse);
      } else {
        const new_rune = "/" + runes[i][0].toUpperCase() + runes[i][1] + ".png";
        r.push(new_rune);
      }
      //set_rune_images(old_rune_images => [...old_rune_images, ...[new_rune]])
    }

    set_rune_images(r);
  }

  function populate() {
    return (
    <div className="inline">
      {rune_images.map((image, i) => (
        <Image
          className="inline my-4"
          key={i}
          src={image}
          width={32}
          height={32}
          alt="rune"
        />
      ))}
    </div> 
    )
  }
  
  return (
    <div className="flex-col mt-8">
      <form onSubmit={parse} className="mx-auto w-1/2">
        <div className="flex-col">
          <textarea name="sentence" placeholder="Type your English sentence here..." className="mx-auto min-h-20 w-full px-3 py-2.5 text-lg font-bold rounded-lg border focus:outline focus:outline-2 focus:outline-offset-2 bg-[#eeeeee] text-[#444444] focus:outline-[#aaaaaa] border-[#cccccc]"></textarea>
          <div>
            <input type="submit" value="Translate" className="block mx-auto mt-8 mb-4 font-bold rounded-lg text-lg  w-48 h-16 bg-slate-0 text-[#444444] hover:bg-slate-200 active:bg-slate-400"></input>
          </div>
        </div>
      </form>
      <div className="mx-8">
        {populate()}
      </div>
    </div>
  );
}
