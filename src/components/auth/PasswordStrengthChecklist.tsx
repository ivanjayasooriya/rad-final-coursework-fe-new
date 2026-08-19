interface PasswordRule {
  label: string;
  test: (password: string) => boolean;
}

const PasswordStrengthChecklist = ({
  password,
  rules,
}: {
  password: string;
  rules: PasswordRule[];
}) => (
  <div className="mt-3 p-3 bg-gray-100 border-2 border-black flex flex-col gap-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
    {rules.map((rule) => {
      const passed = rule.test(password);
      return (
        <div key={rule.label} className="flex items-center gap-2">
          <div
            className={`h-4 w-4 border-2 border-black flex items-center justify-center shrink-0 text-xs font-black ${passed ? "bg-green-400 text-black" : "bg-white"}`}
          >
            {passed ? "✓" : "×"}
          </div>
          <span
            className={`text-xs font-bold uppercase tracking-tight ${passed ? "text-green-700 decoration-black" : "text-black"}`}
          >
            {rule.label}
          </span>
        </div>
      );
    })}
  </div>
);

export default PasswordStrengthChecklist;
