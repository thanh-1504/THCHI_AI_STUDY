import api from "../lib/axios";

const learnServices = {
  getCourses: async () => {
    const response = await api.get("/courses");
    return response.data;
  },
  getCourse: async (id) => {
    const response = await api.get(`/courses/${id}`);
    return response.data;
  },
  getTopicIncludeWord: async (topicId) => {
    const response = await api.get(`/topic-word/${topicId}`);
    return response.data;
  },
  enrollCourse: async (courseId) => {
    const response = await api.post(`/course-enroll`, { courseId });
    return response.data;
  },
  createLearningSession: async (topicId) => {
    const response = await api.post(`/learning-session/${topicId}`);
    return response.data;
  },
  createLearningSessionLog: async (payload) => {
    const response = await api.post(`/learning-session/log`, payload);
    return response.data;
  },
};
export default learnServices;
