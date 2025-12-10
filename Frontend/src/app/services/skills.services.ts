
import { useState, useEffect, useCallback } from "react";
import axios, { AxiosError } from "axios";

// 1. Types

export interface Skill {
  _id: string;
  name: string;
  level: string;
  icon?: string;
  [key: string]: unknown; // if server sends extra fields
}

interface ApiListResponse<T> {
  data: T;
  message?: string;
  success?: boolean;
}

interface ApiSingleResponse<T> {
  data: T;
  message?: string;
  success?: boolean;
}

// ----------------------
// 2. Axios Instance (typed)
// ----------------------
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// ----------------------
// 3. Main Service Hook
// ----------------------
export const skillsServices = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<AxiosError | null>(null);

  // ----------------------
  // Fetch all skills
  // ----------------------
  const fetchSkills = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get<ApiListResponse<Skill[]>>("/skill/get");
      setSkills(response.data.data);
    } catch (err) {
      setError(err as AxiosError);
    } finally {
      setLoading(false);
    }
  }, []);

  // ----------------------
  // Get skill by ID
  // ----------------------
  const getSkillById = useCallback(async (id: string) => {
    setLoading(true);
    try {
      const response = await api.get<ApiSingleResponse<Skill>>(`/skill/${id}`);
      return response.data.data;
    } catch (err) {
      setError(err as AxiosError);
    } finally {
      setLoading(false);
    }
  }, []);

  // ----------------------
  // Create skill
  // ----------------------
  const createSkill = useCallback(async (data: Partial<Skill>) => {
    setLoading(true);
    try {
      const response = await api.post<ApiSingleResponse<Skill>>(
        "/skill/create",
        data
      );
      return response.data.data;
    } catch (err) {
      setError(err as AxiosError);
    } finally {
      setLoading(false);
    }
  }, []);

  // ----------------------
  // Update skill
  // ----------------------
  const updateSkill = useCallback(
    async (id: string, data: Partial<Skill>) => {
      setLoading(true);
      try {
        const response = await api.put<ApiSingleResponse<Skill>>(
          `/skill/update/${id}`,
          data
        );
        await fetchSkills();
        return response.data.data;
      } catch (err) {
        setError(err as AxiosError);
      } finally {
        setLoading(false);
      }
    },
    [fetchSkills]
  );

  // ----------------------
  // Delete skill
  // ----------------------
  const deleteSkill = useCallback(
    async (id: string) => {
      setLoading(true);
      try {
        const response = await api.delete<ApiSingleResponse<Skill>>(
          `/skill/delete/${id}`
        );
        await fetchSkills();
        return response.data.data;
      } catch (err) {
        setError(err as AxiosError);
      } finally {
        setLoading(false);
      }
    },
    [fetchSkills]
  );

  // ----------------------
  // Load skills on mount
  // ----------------------
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
