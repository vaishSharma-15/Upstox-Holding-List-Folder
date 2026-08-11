import { HoldingsProvider, useHoldingsDispatch, useHoldingsState } from "./context/HoldingsContext";
import { ToastProvider, useToast } from "./context/ToastContext";
import BottomTabBar from "./components/BottomTabBar";
import StatusBar from "./components/StatusBar";
import ToastStack from "./components/ToastStack";
import HomeScreen from "./screens/HomeScreen";
import HoldingsScreen from "./screens/HoldingsScreen";

function AppShell() {
  const { screen } = useHoldingsState();
  const dispatch = useHoldingsDispatch();
  const { toasts, pushToast } = useToast();

  function handleTabSelect(tab) {
    if (tab === "home" || tab === "holdings") {
      dispatch({ type: "SET_SCREEN", payload: { screen: tab } });
    } else {
      pushToast("Not part of this demo — try Home or Holdings");
    }
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-backdrop sm:py-10">
      {/* iPhone mockup: plain full-bleed on real mobile viewports, framed device chrome on desktop */}
      <div
        className="relative flex h-[100dvh] w-full max-w-md flex-col overflow-hidden bg-ink sm:h-[min(852px,90vh)] sm:w-[393px] sm:max-w-none sm:rounded-[3rem] sm:border-[12px] sm:border-neutral-900 sm:shadow-2xl"
        style={{ transform: "translateZ(0)" }}
      >
        {/* side buttons, desktop chrome only */}
        <div className="absolute -left-[12px] top-[100px] hidden h-9 w-[4px] rounded-l bg-neutral-800 sm:block" />
        <div className="absolute -left-[12px] top-[150px] hidden h-12 w-[4px] rounded-l bg-neutral-800 sm:block" />
        <div className="absolute -left-[12px] top-[172px] hidden h-12 w-[4px] rounded-l bg-neutral-800 sm:block" />
        <div className="absolute -right-[12px] top-[130px] hidden h-16 w-[4px] rounded-r bg-neutral-800 sm:block" />

        <StatusBar />

        {/* dynamic island */}
        <div className="pointer-events-none absolute left-1/2 top-2 z-40 hidden h-[28px] w-[108px] -translate-x-1/2 rounded-full bg-black sm:block" />

        <div className="min-h-0 flex-1 overflow-y-auto sm:pt-11">
          {screen === "holdings" ? <HoldingsScreen /> : <HomeScreen />}
        </div>
        <BottomTabBar active={screen} onSelect={handleTabSelect} />

        {/* home indicator */}
        <div className="pointer-events-none absolute bottom-1.5 left-1/2 z-40 hidden h-[5px] w-[134px] -translate-x-1/2 rounded-full bg-fg/60 sm:block" />

        <ToastStack toasts={toasts} />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <HoldingsProvider>
      <ToastProvider>
        <AppShell />
      </ToastProvider>
    </HoldingsProvider>
  );
}
