'use client';
import Image from "next/image";
import { run } from "node:test";
import { useState } from "react";

export default function Home() {
  var runes: (string | string[])[] = []
  
  const [rune_images, set_rune_images] = useState<String[]>([]);

  const parse = (e: any) => {
    e.preventDefault()
    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);
    let sentence: String = formProps["sentence"].toString();
    console.log(sentence);

    runes = [];
    set_rune_images([]);

    let consonants = "mnptkswlj"
    let consonants2 = "mnptkswlj "
    let vowels = "aeiou"
    
    var i = 0;
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

    var r = [];
    for (var i = 0; i < runes.length; i++) {
      if (vowels.includes(runes[i][0])) {
        var new_rune = "/" + runes[i][1].toUpperCase() + runes[i][0] + ".png";
        var inverse = "/In.png";
        r.push(new_rune);
        r.push(inverse);
      } else {
        var new_rune = "/" + runes[i][0].toUpperCase() + runes[i][1] + ".png";
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
          className="inline my-10"
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
    <div className="">
      <form onSubmit={parse}>
        <textarea name="sentence" className="text-neutral-950  border-neutral-400 border-2 w-full"></textarea>
        <input type="submit"></input>
      </form>
      <div>
        {populate()}
      </div>
    </div>
  );
}
