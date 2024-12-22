import injectable from "@ogre-tools/injectable";
import { skillInjectionToken } from "../engine/skill-injection-token.mjs";

const { getInjectable } = injectable;

export class LearningTopic {
    constructor({ defaultPassingScore = 70, learningPath = [] } = {}) {
        this.topics = {};
        this.scores = {};
        this.globalPassingScore = defaultPassingScore;
        this.learningPath = learningPath;
    }

    addTopic(topic) {
        console.log(`LearningTopic: Adding topic ${topic}`);
        if (this.topics[topic]) {
            throw new Error(`Error: Topic ${topic} already exists.`);
        }
        this.topics[topic] = { completed: false, confirmed: false, passingScore: this.globalPassingScore };
        return `Topic ${topic} added.`;
    }

    recordQuizScore(topic, score) {
        console.log(`LearningTopic: Recording quiz score for topic ${topic}`);
        if (this.topics[topic] === undefined) {
            throw new Error(`Error: Topic ${topic} not found.`);
        }
        if (score < 0 || score > 100) {
            throw new Error(`Error: Quiz score must be between 0 and 100.`);
        }
        this.scores[topic] = score;
        return `Quiz score of ${score} recorded for topic ${topic}.`;
    }

    setLearningPath(path) {
        console.log(`LearningTopic: Setting learning path`);
        this.learningPath = path;
    }

    getNextTopic() {
        console.log(`LearningTopic: Getting next topic`);
        const completedTopics = Object.keys(this.topics).filter(t => this.topics[t].completed);
        const nextTopic = this.learningPath[completedTopics.length];
        return nextTopic ? `Next topic to learn: ${nextTopic}` : `All topics completed!`;
    }
}