import { useState, useEffect } from 'react';
import { Eye, EyeOff, Shield, Zap, Lock, TrendingUp } from 'lucide-react';

export default function PasswordAnalyzer() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [strength, setStrength] = useState({ score: 0, label: '', color: '' });
  const [checks, setChecks] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
    noCommon: true
  });

  const commonPasswords = ['password', '123456', 'qwerty', 'admin', 'letmein', 'welcome'];

  useEffect(() => {
    analyzePassword(password);
  }, [password]);

  const analyzePassword = (pwd) => {
    const newChecks = {
      length: pwd.length >= 12,
      uppercase: /[A-Z]/.test(pwd),
      lowercase: /[a-z]/.test(pwd),
      number: /[0-9]/.test(pwd),
      special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pwd),
      noCommon: !commonPasswords.some(common => pwd.toLowerCase().includes(common))
    };
    setChecks(newChecks);

    let score = 0;
    if (newChecks.length) score += 2;
    if (newChecks.uppercase) score += 1;
    if (newChecks.lowercase) score += 1;
    if (newChecks.number) score += 1;
    if (newChecks.special) score += 1;
    if (newChecks.noCommon) score += 1;
    if (pwd.length >= 16) score += 1;

    let label = '';
    let color = '';
    if (score === 0) {
      label = '';
      color = '';
    } else if (score <= 3) {
      label = 'Weak';
      color = 'bg-red-500';
    } else if (score <= 5) {
      label = 'Fair';
      color = 'bg-orange-500';
    } else if (score <= 7) {
      label = 'Good';
      color = 'bg-yellow-500';
    } else {
      label = 'Strong';
      color = 'bg-emerald-500';
    }

    setStrength({ score, label, color });
  };

  const getTimeToCrack = () => {
    if (password.length === 0) return null;
    
    let charsetSize = 0;
    if (/[a-z]/.test(password)) charsetSize += 26;
    if (/[A-Z]/.test(password)) charsetSize += 26;
    if (/[0-9]/.test(password)) charsetSize += 10;
    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) charsetSize += 32;
    
    const combinations = Math.pow(charsetSize, password.length);
    const guessesPerSecond = 1e9;
    const seconds = combinations / guessesPerSecond / 2;
    
    if (seconds < 60) return 'Instantly';
    if (seconds < 3600) return Math.round(seconds / 60) + ' minutes';
    if (seconds < 86400) return Math.round(seconds / 3600) + ' hours';
    if (seconds < 31536000) return Math.round(seconds / 86400) + ' days';
    if (seconds < 31536000000) return Math.round(seconds / 31536000) + ' years';
    return 'Centuries';
  };

  const CheckItem = ({ met, label }) => (
    <div className="flex items-center gap-3 group">
      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
        met ? 'border-emerald-500 bg-emerald-500' : 'border-white/20'
      }`}>
        {met && (
          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>
      <span className={`text-sm transition-colors duration-200 ${
        met ? 'text-white' : 'text-white/50'
      }`}>
        {label}
      </span>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-900 text-white p-4 sm:p-8 flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40"></div>
      
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="w-full max-w-2xl relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 mb-4 shadow-2xl shadow-purple-500/50 animate-pulse">
            <Shield className="w-8 h-8" />
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold mb-3 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
            Password Strength
          </h1>
          <p className="text-purple-200 text-lg">Create a secure password that's hard to crack</p>
        </div>

        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
          <div className="mb-8">
            <label className="block text-sm font-medium text-white/80 mb-3">Your Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password..."
                className="w-full px-5 py-4 bg-white/5 border-2 border-white/20 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-200 pr-14 text-lg"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {password && (
            <>
              <div className="mb-8">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-white/80">Password Strength</span>
                  <span className={`text-sm font-bold px-3 py-1 rounded-full ${
                    strength.label === 'Weak' ? 'bg-red-500/30 text-red-200' :
                    strength.label === 'Fair' ? 'bg-orange-500/30 text-orange-200' :
                    strength.label === 'Good' ? 'bg-yellow-500/30 text-yellow-200' :
                    'bg-emerald-500/30 text-emerald-200'
                  }`}>
                    {strength.label}
                  </span>
                </div>
                <div className="h-3 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
                  <div
                    className={`h-full ${strength.color} transition-all duration-500 ease-out rounded-full shadow-lg`}
                    style={{ 
                      width: `${(strength.score / 8) * 100}%`,
                      boxShadow: strength.score > 0 ? '0 0 20px currentColor' : 'none'
                    }}
                  />
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-sm font-medium text-white/80 mb-4">Requirements</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <CheckItem met={checks.length} label="At least 12 characters" />
                  <CheckItem met={checks.uppercase} label="Uppercase letter (A-Z)" />
                  <CheckItem met={checks.lowercase} label="Lowercase letter (a-z)" />
                  <CheckItem met={checks.number} label="Number (0-9)" />
                  <CheckItem met={checks.special} label="Special character" />
                  <CheckItem met={checks.noCommon} label="Not a common password" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-5 hover:border-white/30 hover:bg-white/10 transition-all">
                  <div className="flex items-center gap-3 mb-2">
                    <Zap className="w-5 h-5 text-violet-400" />
                    <span className="text-xs font-medium text-white/60 uppercase tracking-wider">Crack Time</span>
                  </div>
                  <p className="text-2xl font-bold">{getTimeToCrack()}</p>
                </div>
                
                <div className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-5 hover:border-white/30 hover:bg-white/10 transition-all">
                  <div className="flex items-center gap-3 mb-2">
                    <Lock className="w-5 h-5 text-emerald-400" />
                    <span className="text-xs font-medium text-white/60 uppercase tracking-wider">Length</span>
                  </div>
                  <p className="text-2xl font-bold">{password.length} chars</p>
                </div>
                
                <div className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-5 hover:border-white/30 hover:bg-white/10 transition-all">
                  <div className="flex items-center gap-3 mb-2">
                    <TrendingUp className="w-5 h-5 text-pink-400" />
                    <span className="text-xs font-medium text-white/60 uppercase tracking-wider">Score</span>
                  </div>
                  <p className="text-2xl font-bold">{strength.score}/8</p>
                </div>
              </div>
            </>
          )}

          {!password && (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/5 backdrop-blur-sm mb-4 border border-white/20">
                <Lock className="w-10 h-10 text-white/40" />
              </div>
              <p className="text-white/60">Start typing to analyze your password strength</p>
            </div>
          )}
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-purple-200/80">
            Tip: Use a mix of uppercase, lowercase, numbers, and symbols for maximum security
          </p>
        </div>
      </div>
    </div>
  );
}
