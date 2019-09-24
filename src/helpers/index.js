import { normalize, schema } from 'normalizr';

export const normalizeData = (data) => {
    const reply = new schema.Entity('replies')
    const replies = new schema.Array(reply)
    reply.define({ replies });
    const commentsListSchema = [new schema.Entity('replies', { replies })];

    const normalizedData = normalize(data, commentsListSchema);
    return normalizedData;
};

export const getNormalizeDate = (rawDate) => new Date(rawDate).toLocaleDateString({ year: 'numeric', month: 'long', day: 'numeric'});