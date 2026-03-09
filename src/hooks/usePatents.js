import { useDispatch, useSelector } from "react-redux";

import { setPatents, setStats, addPatent, setSelectedPatent, setFilters } from "../store/slices/patentSlice";
import { useUI } from "./useUI";
import { patentApi } from "../api/patentApi";

export const usePatents = () => {
  const dispatch = useDispatch();
  const { setLoading, setError } = useUI();
  const session = JSON.parse(localStorage.getItem('session') || '{}');
  const userId = session?.user_id || session?.user?.id || null;

  // ✅ Load all cases from API — matches HTML fetchCases()
  const loadPatents = async () => {
    try {
      setLoading(true);
      const cases = await patentApi.getAllCases();
      dispatch(setPatents(cases));

      // Calculate stats from cases like HTML does
      const calculatedStats = {
        activeScans: cases.filter(c => c.status === 'processing').length,
        patentsAnalyzed: cases.length,
        highRiskMatches: cases.reduce((sum, c) => sum + (c.highRiskMatches || c.match_count || 0), 0),
        clearedPatents: cases.filter(c => c.status === 'complete' && !c.matchCount).length,
      };
      dispatch(setStats(calculatedStats));

    } catch (error) {
      setError(error.message || 'Failed to load patents');
    } finally {
      setLoading(false);
    }
  };

  // ✅ Load stats separately — matches HTML fetchStats()
  const loadStats = async () => {
    try {
      const stats = await patentApi.getStats(userId);
      if (stats) {
        dispatch(setStats({
          activeScans: stats.activeScans || 0,
          patentsAnalyzed: stats.patentsAnalyzed || 0,
          highRiskMatches: stats.highRiskMatches || 0,
          clearedPatents: stats.clearedPatents || 0,
          lastScanDate: stats.lastScanDate || null,
          newResults: stats.newResults || 0,
        }));
      }
    } catch (error) {
      console.error('Failed to load stats:', error);
    }
  };

  // ✅ Fetch from USPTO — matches HTML fetchCasefromUspto()
  const fetchFromUspto = async (patentNumber) => {
    try {
      const data = await patentApi.fetchFromUspto(patentNumber);
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // ✅ Generate patent description — matches HTML generatePatentSummary()
  const generateDescription = async (caseId) => {
    try {
      const data = await patentApi.generateDescription(caseId);
      return { success: true, summary: data.summary };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // ✅ Create patent — matches HTML create-patent API call
  const createPatent = async (caseDetails) => {
    try {
      const data = await patentApi.createPatent(caseDetails);
      if (data.case_data) {
        dispatch(addPatent(data.case_data));
      }
      return { success: true, caseId: data.case_id, caseData: data.case_data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // ✅ Run full analysis — matches HTML beginSimilarityAnalysis()
  const runAnalysis = async (caseId) => {
    try {
      // Step 1: Get claims
      const claims = await patentApi.getClaims(caseId);
      console.log('Claims:', claims);

      // Step 2: Run infringement analysis
      const analysisData = await patentApi.getInfringementAnalysis(caseId);
      console.log('Analysis:', analysisData);

      // Step 3: Update case with infringements
      if (analysisData.similar_infringements?.length > 0) {
        await patentApi.updateCase(caseId, {
          infringements: analysisData.similar_infringements,
          claims,
        });
      }

      return { success: true, data: analysisData };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const selectPatent = (patent) => dispatch(setSelectedPatent(patent));
  const filterPatents = (filters) => dispatch(setFilters(filters));

  return {
    loadPatents,
    loadStats,
    fetchFromUspto,
    generateDescription,
    createPatent,
    runAnalysis,
    selectPatent,
    filterPatents,
  };
};
