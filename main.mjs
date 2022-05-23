import { CeramicClient } from "@ceramicnetwork/http-client";
import { DataModel } from "@glazed/datamodel";
import { DIDDataStore } from "@glazed/did-datastore";
import { DID } from "dids";
import { Ed25519Provider } from "key-did-provider-ed25519";
import { getResolver } from "key-did-resolver";
import { fromString } from "uint8arrays";
import modelAliases from "./model.json";

const key = fromString(process.env.DID_KEY, "base16");

const did = new DID({
  provider: new Ed25519Provider(key),
  resolver: getResolver(),
});

await did.authenticate();

const ceramic = new CeramicClient("http://0.0.0.0:7007");
ceramic.did = did;

const model = new DataModel({ ceramic, model: modelAliases });
// const manager = new ModelManager({ ceramic })
const store = new DIDDataStore({ ceramic, model });

const person1 = {
  name: "John Doe",
  age: 42,
  friends: [{ name: "Jane Doe", age: 24 }],
};

const newNote = await model.createTile("Person", person1);
// console.log("Reached here!");
console.log("newNote.content", newNote.content);

// await store.set("PersonDefinition", person1);
// const x = await store.get("PersonDefinition");
// console.log(x);

// const streamId =
//   "kjzl6cwe1jw1483b4ichs9jc88vaaaeyiezyvo8ylu6ul9di7gevhka1ok82adj";
// const stream = await ceramic.loadStream(streamId);

// console.log(stream.content);
