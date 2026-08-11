import { createContext, useContext, useEffect, useReducer } from "react";
import { mockHoldings } from "../data/mockHoldings";

const STORAGE_KEY = "upstox-folders-demo-state";

function loadPersisted() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function buildInitialState() {
  const persisted = loadPersisted();
  const folderIdsByHoldingId = new Map(
    (persisted?.holdings ?? []).map((h) => [h.id, h.folderIds])
  );
  return {
    holdings: mockHoldings.map((h) => ({
      ...h,
      folderIds: folderIdsByHoldingId.get(h.id) ?? h.folderIds,
    })),
    folders: persisted?.folders ?? [],
    activeView: persisted?.activeView ?? { type: "all" },
    screen: persisted?.screen ?? "home",
  };
}

function createFolderId() {
  return `f_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

function reducer(state, action) {
  switch (action.type) {
    case "CREATE_FOLDER": {
      const folder = {
        id: createFolderId(),
        name: action.payload.name,
        color: action.payload.color,
        icon: action.payload.icon,
        createdAt: Date.now(),
      };
      return { ...state, folders: [...state.folders, folder] };
    }

    case "UPDATE_FOLDER": {
      return {
        ...state,
        folders: state.folders.map((folder) =>
          folder.id === action.payload.id ? { ...folder, ...action.payload } : folder
        ),
      };
    }

    case "DELETE_FOLDER": {
      const { id } = action.payload;
      const wasViewingDeleted =
        state.activeView.type === "folder" && state.activeView.folderId === id;
      return {
        ...state,
        folders: state.folders.filter((folder) => folder.id !== id),
        holdings: state.holdings.map((holding) =>
          holding.folderIds.includes(id)
            ? { ...holding, folderIds: holding.folderIds.filter((fid) => fid !== id) }
            : holding
        ),
        activeView: wasViewingDeleted ? { type: "all" } : state.activeView,
      };
    }

    case "ASSIGN_TO_FOLDER": {
      const { holdingId, folderId } = action.payload;
      return {
        ...state,
        holdings: state.holdings.map((holding) =>
          holding.id === holdingId && !holding.folderIds.includes(folderId)
            ? { ...holding, folderIds: [...holding.folderIds, folderId] }
            : holding
        ),
      };
    }

    case "UNASSIGN_FROM_FOLDER": {
      const { holdingId, folderId } = action.payload;
      return {
        ...state,
        holdings: state.holdings.map((holding) =>
          holding.id === holdingId
            ? { ...holding, folderIds: holding.folderIds.filter((fid) => fid !== folderId) }
            : holding
        ),
      };
    }

    case "SET_VIEW": {
      return { ...state, activeView: action.payload.view };
    }

    case "SET_SCREEN": {
      return { ...state, screen: action.payload.screen };
    }

    default:
      return state;
  }
}

const HoldingsStateContext = createContext(null);
const HoldingsDispatchContext = createContext(null);

export function HoldingsProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, undefined, buildInitialState);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  return (
    <HoldingsStateContext.Provider value={state}>
      <HoldingsDispatchContext.Provider value={dispatch}>
        {children}
      </HoldingsDispatchContext.Provider>
    </HoldingsStateContext.Provider>
  );
}

export function useHoldingsState() {
  const ctx = useContext(HoldingsStateContext);
  if (!ctx) throw new Error("useHoldingsState must be used within HoldingsProvider");
  return ctx;
}

export function useHoldingsDispatch() {
  const ctx = useContext(HoldingsDispatchContext);
  if (!ctx) throw new Error("useHoldingsDispatch must be used within HoldingsProvider");
  return ctx;
}
