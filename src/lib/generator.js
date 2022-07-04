const capitalize = (/** @type {string} */ text) => {
    const a = [...text]
    a[0] = a[0].toUpperCase();
    return a.join("");
}
const block = () => {
    const b = `<p><span style="color: #000000;"><span style="font-family: Arial, serif;"><span style="font-size: medium;">=============================================================</span></span></span></p>`;
    return b;
}
const kv = (/** @type {string} */ key,/** @type {string} */ value) => {
    return `<p align="left"><strong><span style="font-family: Arial, serif;"><span style="font-size: medium;">${key}: </span></span></strong><span style="font-family: Arial, serif;"><span style="font-size: medium;">${value}</span></span></p>`
}
const title = (/** @type {string} */ t) => {
    return `<p><strong><span style="color: #000000;"><span style="font-family: Arial, serif;"><span style="font-size: medium;">${t}</span></span></span></strong><span style="color: #000000;"><span style="font-family: Arial, serif;"><span style="font-size: medium;">: </span></span></span></p>`
}
const paragraph = (/** @type {string} */ text) => {
    return `<p><span style="color: #000000;"><span style="font-family: Arial, serif;"><span style="font-size: medium;">${text}</span></span></span></p>`
}
const list = (/** @type {array} */ l,prefix=false,  ordered = true,) => {
    const openingTag = ordered ? "<ol>" : "<ul>";
    const closingTag = ordered ? "</ol>" : "</ul>";
    const items = l.map((elem) => {
        if (typeof elem === 'object') {

            return `<li>
            ${Object.entries(elem).map(([key, value]) => `${paragraph(`${prefix?`${capitalize(key)}: `:""} ${capitalize(value)}`)}`).reduce((prev, current) => prev + current, " ")}
            </li>`

        }
        return `<li>
        ${paragraph(capitalize(elem))}
        </li>`

    });

    return [openingTag, ...items, closingTag].reduce((prev, current) => prev + current, " ");
}

/**
 * @param {any} obj
 */
export function generateDailyEvaluation(obj) {


    const template = `
    ${kv("Student Name", obj.student)}
    ${kv("Topic", obj.topic)}
    ${kv("Schedule", obj.schedule)}
    ${kv("Book Page", obj.bookPage)}
    ${kv("Teacher's Nickname", obj.teacherNickname)}
    ${block()}
    ${title('CORRECTED SENTENCES')}
    ${list(obj.correctedSentences, true)}
    ${block()}
    ${title('MISPRONOUNCED WORDS')}
    ${list(obj.mispronouncedWords)}
    ${block()}
    ${title('LEARNED VOCABULARY')}
    ${list(obj.learnedVocabulary)}
    ${block()}
    ${obj.reminder ? title('REMINDERS/FEEDBACK') : ""}
    ${obj.reminder ? paragraph(obj.reminder) : ""}
    ${obj.reminder ? block() : ""}
    ${kv("Next Topic", obj.nextTopic)}
    ${kv("Next Page", obj.nextPage)}`


    return template;

}