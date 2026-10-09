import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hr-questions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hr-questions.component.html',
  styleUrl: './hr-questions.component.css',
})
export class HrQuestionsComponent {
  hrTips = [
    'Research the company thoroughly — mention specific products, culture, or recent achievements',
    'Use the STAR method (Situation, Task, Action, Result) for behavioral questions',
    'Be honest about your experience level — never claim expertise you do not have',
    'Ask thoughtful questions at the end — "What does success look like in the first 90 days?"',
    'Prepare your salary expectations with market research (Glassdoor, LinkedIn, Levels.fyi)',
    'Practice answers out loud — hearing yourself prevents rambling in the interview',
    'Dress appropriately for the company culture — when in doubt, dress one level up',
    'Arrive 5 minutes early (or join the video call 2 minutes early)',
    'Send a thank-you email within 24 hours after the interview',
    'Be positive — never speak negatively about previous employers or teammates',
  ];

  hrQuestions = [
    {
      q: 'Tell me about yourself.',
      a: 'I am a frontend developer with 4 years of experience specializing in Angular. I started my career at a startup where I built customer-facing dashboards from scratch, then moved to my current company where I lead a team of 3 developers building an e-commerce platform serving 500K monthly users. I am passionate about performance optimization and clean code architecture. Outside work, I contribute to open-source Angular libraries and mentor junior developers in my local community.',
      tip: 'Keep it to 90 seconds. Structure: current role → career highlights → why you are here today. Do not recite your resume — add personality.'
    },
    {
      q: 'Why do you want to join our company?',
      a: 'I have been following your company\'s growth for the past year. I am particularly impressed by your investment in technical excellence — your engineering blog posts on micro-frontend architecture show a team that thinks deeply about scalability. The product aligns with my interest in fintech, and the opportunity to work on a greenfield Angular 17 project with signals and standalone components is exciting. I believe I can contribute meaningfully while also growing my skills here.',
      tip: 'Be specific — mention the company name, a product, a blog post, or a news article. Vague answers like "great company culture" are red flags.'
    },
    {
      q: 'What are your greatest strengths?',
      a: 'My strongest skill is performance optimization in Angular. I have a track record of reducing bundle sizes and improving load times — most recently cutting an app\'s TTI from 8 seconds to 2 seconds. Alongside that, I am a strong communicator — I translate complex technical decisions into business language for stakeholders. Third, I am self-driven: I stay current with Angular\'s evolution and proactively adopt new features like signals before they become mainstream.',
      tip: 'Give 2-3 specific strengths with brief proof. Avoid generic answers like "I\'m a hard worker" — everyone says that.'
    },
    {
      q: 'What are your weaknesses?',
      a: 'I used to spend too much time perfecting code before sharing it for review, which slowed down delivery. I recognized this pattern and adopted a "share early, iterate fast" approach — now I open PRs as drafts within a day of starting, get early feedback, and deliver more quickly without sacrificing quality. I am still working on this balance, but it has improved my velocity significantly.',
      tip: 'Give a real weakness, not "I work too hard." Show self-awareness AND growth. The interviewer wants to see you can identify and address your shortcomings.'
    },
    {
      q: 'Where do you see yourself in 5 years?',
      a: 'In 5 years I see myself as a technical lead or architect, guiding a team and making key technology decisions. I want to deepen my expertise in frontend architecture — micro-frontends, design systems, and performance at scale. I am also interested in contributing back to the Angular community through open-source work. Most importantly, I want to be in a role where I am solving genuinely hard problems and helping junior developers grow.',
      tip: 'Show ambition aligned with the company\'s growth trajectory. Avoid: "I want your job" or being too vague. Show how the role helps you get there.'
    },
    {
      q: 'Why are you leaving your current job?',
      a: 'My current role has been a great learning experience — I have grown from a mid-level developer to leading a small team. However, I feel I have reached a plateau in terms of technical challenge. The architecture is stable and maintenance-focused now, and there are limited opportunities to work with newer Angular features or solve greenfield problems. I am looking for a role where I can continue growing and take on more architectural responsibility.',
      tip: 'Never say negative things about your current employer. Frame it as "growing beyond the current role" not "escaping a bad situation."'
    },
    {
      q: 'What is your expected salary?',
      a: 'Based on my research — Glassdoor, LinkedIn salary insights, and conversations with peers — the market rate for a senior Angular developer in this city with my experience level is between X and Y. I am targeting that range, with flexibility depending on the overall compensation package including benefits, remote work flexibility, and growth opportunities. What is the budgeted range for this role?',
      tip: 'Research the market before the interview. Give a range, not a single number. Ask about the budgeted range — this gives you leverage. Consider total comp: base, bonus, stock, benefits.'
    },
    {
      q: 'Tell me about a time you had a conflict with a teammate. How did you resolve it?',
      a: 'During a code review, a senior colleague and I disagreed on whether to use NgRx or a simpler BehaviorSubject service for a new feature. He preferred NgRx for consistency; I felt it was over-engineering for the feature\'s scope. I requested a 30-minute call where I presented both approaches with pros/cons and complexity metrics. We agreed on a hybrid: simpler service for that feature with a documented plan to migrate to NgRx when complexity grew. The feature shipped on time and the approach became our team\'s standard for feature sizing decisions.',
      tip: 'Use STAR method. Show you can disagree professionally, listen, and find common ground. Avoid framing yourself as always right.'
    },
    {
      q: 'Describe a situation where you had to meet a tight deadline.',
      a: 'Two weeks before a major product launch, our QA team discovered a critical performance issue — the product listing page was timing out on mobile. With 10 days left, I took ownership of the fix. I profiled the issue, identified 3 main culprits (unoptimized images, non-lazy-loaded modules, and missing trackBy), created a daily fix target, and communicated progress to the project manager daily. We fixed all issues in 8 days, with 2 days for testing. The launch happened on schedule.',
      tip: 'Show planning, prioritization, communication, and execution under pressure. Quantify the timeline and results.'
    },
    {
      q: 'How do you handle criticism of your code during code reviews?',
      a: 'I welcome code review feedback — it is how I learn fastest. My approach is to read all comments before responding, separate personal feelings from technical merit, and ask clarifying questions when I do not understand the reasoning. If I disagree, I explain my perspective with data or code examples. I have learned some of my best Angular patterns from review comments — for example, I discovered the switchMap/exhaustMap distinction from a reviewer\'s suggestion. I also try to give the quality of feedback I want to receive.',
      tip: 'Interviewers want to know you are not defensive. Show emotional maturity and a growth mindset. Giving a concrete learning example is powerful.'
    },
    {
      q: 'What motivates you?',
      a: 'I am motivated by visible impact and continuous learning. When I optimize a page load from 6 seconds to under 2, knowing that thousands of users now have a better experience is genuinely satisfying. I also get energized by learning — Angular\'s signal system was exciting to explore because it changes how I think about reactivity. And I find mentoring junior developers motivating: explaining a complex concept simply requires me to deeply understand it myself.',
      tip: 'Be authentic and specific. Generic "I love challenges" answers are forgettable. Tie your motivation to the role you are interviewing for.'
    },
    {
      q: 'Are you comfortable working in a team?',
      a: 'Absolutely — my best work has been collaborative. I enjoy pair programming for complex problems, and I have run our team\'s architecture discussions for the past year. I contribute to code reviews consistently and document my decisions so teammates can learn from them. That said, I am also productive working independently — I manage my own tasks without needing daily check-ins. I adapt to whatever working style the team prefers.',
      tip: 'Show both teamwork AND autonomy. Most companies want developers who collaborate well but do not need hand-holding.'
    },
    {
      q: 'What do you know about our tech stack?',
      a: 'From your job description and engineering blog, you use Angular 17 with standalone components and signals — which aligns perfectly with where I have been investing my learning. Your backend appears to be a microservices architecture on Kubernetes with REST APIs. I noticed your blog post on migrating from NgRx to lighter state management, which matches a trend I have been exploring. I am comfortable adapting to your stack specifics quickly.',
      tip: 'Do your homework before the interview. Read the job description carefully, check their GitHub, engineering blog, LinkedIn, and tech talks. Show genuine interest.'
    },
    {
      q: 'How do you stay updated with Angular and frontend development?',
      a: 'I follow the official Angular blog and changelog closely. I read the Angular repository\'s discussions and RFC proposals to understand upcoming features before they release. I watch key conference talks (ng-conf, JSConf). I follow core team members on social media. I practice new features in side projects immediately after release rather than waiting to use them at work. I also spend time in the Angular Discord and Stack Overflow community.',
      tip: 'Show specific sources, not just "I Google things." Mentioning specific community resources or contributions demonstrates genuine passion.'
    },
    {
      q: 'Can you work under pressure?',
      a: 'Yes, and I have developed strategies to manage high-pressure situations effectively. I prioritize ruthlessly — identifying the most critical path first. I communicate proactively with stakeholders so there are no surprises. I break large problems into daily achievable milestones. And I know when to ask for help rather than struggling alone. I find that systematic problem-solving under pressure often produces some of my best work.',
      tip: 'Back up with a brief example from your experience. Saying "yes" alone is not convincing — a short story is.'
    },
    {
      q: 'Are you willing to relocate?',
      a: 'I prefer remote or hybrid work arrangements, which is part of why I am interested in this role. If relocation became beneficial for the role long-term, I would be open to discussing it. What does the work arrangement look like for this position?',
      tip: 'Be honest about your actual preference. Ask about the arrangement early — it affects your decision and shows you have thought about it.'
    },
    {
      q: 'How do you prioritize tasks when you have multiple deadlines?',
      a: 'I use a simple priority framework: first identify which tasks are blocking others (dependencies), then sort by business impact and deadline urgency. I use tools like Jira or Linear to track tasks and update estimates when requirements change. I communicate early if a deadline is at risk — no surprises. I also protect focus time by batching meetings and turning off notifications during deep work hours.',
      tip: 'Show you have a system, not just "I make a to-do list." Mentioning proactive communication shows maturity.'
    },
    {
      q: 'What is your notice period at your current job?',
      a: 'My current notice period is 30 days as per my employment agreement. However, I can discuss this with my employer if a faster start is critical — the relationship is positive and there may be flexibility. When would you ideally need someone to start?',
      tip: 'Be honest about your notice period. Asking when they need someone to start shows you are interested and opens a negotiation if needed.'
    },
    {
      q: 'Do you prefer working on new features or fixing bugs?',
      a: 'I enjoy both for different reasons. New features are exciting because they involve architectural decisions and greenfield thinking. Bug fixes, especially performance or hard-to-reproduce issues, are satisfying puzzles that deepen my understanding of how the framework works internally. In practice, I think a healthy team needs people who value both — features deliver value, quality maintenance prevents technical debt from eroding velocity.',
      tip: 'Do not say you hate bugs — every developer deals with them. Show balance and intellectual curiosity about both activities.'
    },
    {
      q: 'Have you ever missed a deadline? What happened?',
      a: 'Yes, once. We underestimated the complexity of integrating a third-party payment gateway — it had inconsistent API documentation and multiple edge cases we did not anticipate. By day 3, I recognized we were behind and immediately flagged it to the project manager with a revised estimate and a plan to reduce scope for the MVP. We shipped a simpler integration on time and added the advanced features in the next sprint. The lesson: start integration work earlier and spike third-party APIs before committing to timelines.',
      tip: 'Honesty is respected here. Show you took accountability, communicated early, had a plan, and drew a lesson. Blaming others or saying you never miss deadlines sounds dishonest.'
    },
    {
      q: 'How do you handle working with a difficult team member?',
      a: 'I try to understand the root cause first — often a difficult teammate is under pressure, frustrated, or feeling unheard. I schedule a private conversation, ask about their perspective, and listen. I separate the behavior from the person. If the issue is technical disagreement, I look for objective criteria to evaluate approaches. If the behavior persists and affects team delivery, I involve the team lead with documented examples rather than venting to peers.',
      tip: 'Show emotional intelligence, not drama. Avoid naming actual people from past jobs. Show you escalate appropriately, not immediately.'
    },
    {
      q: 'What are your hobbies outside of work?',
      a: 'I enjoy hiking on weekends — it is a great way to disconnect from screens and reset my thinking. I also contribute to an open-source Angular form library in my spare time — it keeps my skills sharp and gives back to the community. I play chess online, which I find develops the same systematic thinking I apply to problem-solving at work.',
      tip: 'Be genuine — do not fabricate hobbies. Mention something that shows you are well-rounded. If you have a hobby that transfers a skill (chess → strategy, hiking → physical wellness), connect the dots briefly.'
    },
    {
      q: 'Why should we hire you over other candidates?',
      a: 'You should hire me because I bring three things most candidates cannot offer together: deep Angular expertise with proven production results, a track record of improving team processes beyond just writing code, and genuine passion for the domain you operate in. I do not just implement features — I think about architecture, performance, and maintainability. And based on our conversation today, I am confident I can contribute meaningfully from week one while continuing to grow into the more senior challenges your team faces.',
      tip: 'Be confident, not arrogant. This is your sales pitch — highlight what makes you uniquely valuable for this specific role, not just generically.'
    },
    {
      q: 'Are you applying to other companies?',
      a: 'Yes, I am in conversations with a couple of other companies as well — I want to make a thoughtful decision and evaluate a few good options. That said, your company is at the top of my list because of the combination of technical challenge, product impact, and team culture. If the process moves forward well, I am very excited about the possibility of joining here.',
      tip: 'Be honest — most candidates are interviewing elsewhere. It creates positive pressure and shows you are in demand. Do not sound desperate or like this is your only option.'
    },
    {
      q: 'Do you have any questions for us?',
      a: 'Yes! A few: What does a typical day look like for the engineering team here? What is the biggest technical challenge the frontend team is currently working through? How does the team approach technical debt and architecture evolution? What does success look like in the first 3 months in this role? And — what do you personally enjoy most about working here?',
      tip: 'Always have 3-5 questions ready. Questions show genuine interest and help you evaluate if the role is right for you. Never say "No, I think you covered everything" — it signals low interest.'
    },
    {
      q: 'How do you handle learning new technologies on the job?',
      a: 'I follow a learn-by-doing approach. First I read the official documentation and understand the mental model. Then I build a small prototype that mirrors a real use case from my current work. I look for patterns that differ from what I know and understand why — this helps me apply the technology correctly rather than just copy-paste examples. I also identify senior colleagues or community experts I can ask specific questions when I get stuck.',
      tip: 'Show a structured learning process, not just "I watch YouTube tutorials." Mention documentation, prototyping, and community as learning resources.'
    },
    {
      q: 'Are you a team player or do you prefer to work independently?',
      a: 'I am both, depending on the task. Complex architecture decisions, debugging sessions, and knowledge transfer work best collaboratively — I actively seek teammates\' input. For deep implementation work, I prefer focused solo time to get into flow state, then share early for feedback. I have found that the best teams value both modes and create space for each.',
      tip: 'Most roles need both qualities. Showing you know when to collaborate vs work independently is more impressive than claiming you are always either one.'
    },
    {
      q: 'What is your management style for leading junior developers?',
      a: 'I believe in guided autonomy. I do not micromanage — I help juniors understand the why behind decisions, not just the what. I give them real ownership of features while making myself available for guidance. I conduct weekly 1:1s to understand blockers and career goals. I review their code in a way that teaches rather than just corrects — asking "What if we tried X?" instead of "This is wrong, do Y." I measure my effectiveness by how quickly they become independent.',
      tip: 'Even if you are not officially a lead, most mid-senior roles involve mentoring. Show emotional intelligence and a teaching mindset.'
    },
    {
      q: 'How do you ensure code quality in a team setting?',
      a: 'Code quality is a team habit, not an individual heroic effort. I advocate for: mandatory PR reviews with constructive feedback culture, ESLint with Angular-specific rules, Prettier for consistent formatting, unit tests as part of definition of done (not a later phase), automated CI gates (lint, test, build), and architecture decision records (ADRs) for significant choices. I also run periodic refactoring sessions where the team pays down technical debt deliberately.',
      tip: 'Show systemic thinking — code quality is about team processes, not just personal skill. Mentioning ADRs is a differentiator that shows architectural maturity.'
    },
    {
      q: 'Tell me about a time you went above and beyond in your role.',
      a: 'During a production incident, our app\'s dashboard started showing incorrect data for about 200 enterprise clients. It happened on a Friday evening — not my on-call week. I joined the incident channel voluntarily, identified that a race condition in our API polling logic was the cause (a problem I had spotted in code review months earlier but was deprioritized), pushed a fix in 3 hours, wrote a post-mortem with prevention steps, and presented it to the team on Monday. The prevention steps were implemented and the issue never recurred.',
      tip: 'Choose an example that shows initiative and impact, not just overtime hours. The post-mortem detail shows engineering maturity.'
    },
    {
      q: 'What is your long-term career goal?',
      a: 'Long-term, I want to become a software architect — someone who makes meaningful technology decisions at the product and platform level, not just the feature level. I want to build systems that scale to millions of users and teams of dozens of developers. In the shorter term, I am focused on deepening my distributed systems knowledge and growing my leadership skills in parallel with my technical track. I see this role as a significant step on that path.',
      tip: 'Show a coherent narrative from your current skills to a long-term vision. Connect it to how this specific role helps you get there. Avoid "I want to be a manager" if you are interviewing for an IC engineering role.'
    },
    {
      q: 'How do you deal with ambiguity or unclear requirements?',
      a: 'I treat ambiguity as an information gap to close, not a blocker. My first step is to document my assumptions and share them with the product owner and relevant stakeholders for confirmation. I ask clarifying questions specifically: "When you say X, do you mean A or B?" rather than open-ended questions. I build the simplest version first, deliver it for review, and iterate. I have found this "walking skeleton" approach is faster than waiting for perfect requirements.',
      tip: 'Employers love developers who can move forward with incomplete information. Show initiative and structured communication, not frustration or paralysis.'
    },
  ];
}
