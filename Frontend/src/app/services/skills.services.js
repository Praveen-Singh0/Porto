"use client"
import { useState, useEffect, useCallback } from "react";
import { handleApiError } from "./errorHandler";
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const skillsServices = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all skills
  const fetchSkills = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get("/skill/get");
      setSkills(response.data.data);
    } catch (error) {
      handleApiError(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Get skill by ID
  const getSkillById = useCallback(async (id) => {
    setLoading(true);
    try {
      const response = await api.get(`/skill/${id}`);
      return response.data;
    } catch (error) {
      handleApiError(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Create skill
  const createSkill = useCallback(async (data) => {
    setLoading(true);
    try {
      const response = await api.post("/skill/create", data);
      fetchSkills(); // Refresh list after adding
      return response.data;
    } catch (error) {
      handleApiError(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Update skill
  const updateSkill = useCallback(async (id, data) => {
    setLoading(true);
    try {
      const response = await api.put(`/skill/update/${id}`, data);
      fetchSkills();
      return response.data;
    } catch (error) {
      handleApiError(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Delete skill
  const deleteSkill = useCallback(async (id) => {
    setLoading(true);
    try {
      const response = await api.delete(`/skill/delete/${id}`);
      fetchSkills();
      return response.data;
    } catch (error) {
      handleApiError(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Load skills on mount
  useEffect(() => {
    fetchSkills();
  }, [fetchSkills]);

  return {
    skills,
    loading,
    error,
    fetchSkills,
    getSkillById,
    createSkill,
    updateSkill,
    deleteSkill,
  };
};
