# Portfolio Scenarios & User Flow Diagram

# Portfolio Structuur / Site Map

Hier is het overzicht van de website navigatie en content blokken, gestructureerd op basis van je PRD en visuele model:

```mermaid
flowchart TD
    %% Styling Classes base on image colors
    classDef about fill:#ffffff,stroke:#99cc33,stroke-width:3px,color:#000
    classDef work fill:#ffffff,stroke:#ff9900,stroke-width:3px,color:#000
    classDef skills fill:#ffffff,stroke:#0066cc,stroke-width:3px,color:#000
    classDef contact fill:#ffffff,stroke:#ff0066,stroke-width:3px,color:#000

    %% Core Navigation Pages
    About[About]:::about
    Work[Work]:::work
    Skills[Skills]:::skills
    Contact[Contact]:::contact
    
    %% Aligning top level side-by-side using invisible links
    About ~~~ Work ~~~ Skills ~~~ Contact

    %% --------------------------------
    %% About Section
    %% --------------------------------
    AboutContent["- Short Background check<br>- Professional bio highlight<br>- Waardes en aanpak (Sociaal sterk, Doelgericht, Coöperatief)"]:::about
    About --- AboutContent

    %% --------------------------------
    %% Work / Projects Section
    %% --------------------------------
    SonicLens[Project 1: Sonic Lens]:::work
    Office[Project 2: Office]:::work
    ScooterApp[Project 3: Scooter Application]:::work
    
    Work --- SonicLens
    Work --- Office
    Work --- ScooterApp
    
    SonicLensContent["- Chrome extension<br>- Technologies used & outcomes<br>- Live/GitHub link"]:::work
    OfficeContent["- Office Management system<br>- Technologies used & outcomes<br>- Live/GitHub link"]:::work
    ScooterAppContent["- Security heavy CLI application<br>- Technologies used & outcomes<br>- Live/GitHub link"]:::work
    
    SonicLens --- SonicLensContent
    Office --- OfficeContent
    ScooterApp --- ScooterAppContent

    %% --------------------------------
    %% Skills Section
    %% --------------------------------
    SkillsContent["- Technical skills (Software Developer/Engineer)<br>- Tools & Technologies<br>- Gebieden voor groei (Technische ervaring)"]:::skills
    Skills --- SkillsContent

    %% --------------------------------
    %% Contact Section
    %% --------------------------------
    ContactContent["- Email: amentsehaie2@gmail.com<br>- Contact formulier (Number, Email)<br>- Social links: LinkedIn, Instagram<br>- GitHub profiel"]:::contact
    Contact --- ContactContent
```

### Explanation of Scenarios:
1. **NavEngine (Scroll & Navigation)**: Tracks the user's scroll position to trigger the Header's glassmorphism transition (Transparent to Frosted) and the Fluid Background's parallax effect.
2. **Project Card Interaction**: Handles the micro-interactions when a user hovers over a project (triggering the Mentos-style neon glow) and clicking to view a larger case study or detail modal.
3. **Contact Form Flow**: Maps out the exact validation states (showing errors vs. valid inputs) and the asynchronous submission states (Sending, Success, Error).
