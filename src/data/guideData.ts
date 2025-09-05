export interface SurvivalGuide {
  id: string;
  title: string;
  category: "emergency" | "medical" | "equipment" | "survival" | "navigation";
  summary: string;
  content: string;
  priority: "critical" | "high" | "medium" | "low";
  lastUpdated: Date;
  tags: string[];
}

export const survivalGuides: SurvivalGuide[] = [
  {
    id: "guide-1",
    title: "Blizzard Survival Protocol",
    category: "emergency",
    summary: "Essential procedures for surviving extreme blizzard conditions when stranded outside base.",
    content: `
# Blizzard Survival Protocol

## Immediate Actions

1. **Stop and assess**: Do not continue traveling in whiteout conditions.
2. **Communication**: Alert base of your position using emergency radio (Channel 16).
3. **Shelter**: Construct emergency snow shelter or use emergency bivouac equipment.
   - If possible, dig a snow cave or trench
   - Use ice blocks as wind barrier
   - Keep entrance small and below sleeping area

## Survival Techniques

### Temperature Management
- Use emergency stove only in well-ventilated areas with snow blocks as windbreak
- Keep all extremities covered - frostbite can occur in under 2 minutes at -40°C with wind
- Use chemical heat packs for extremities
- Maintain hydration with warm liquids if possible

### Navigation
- Do not attempt to navigate in whiteout conditions
- Wait for visibility to improve to at least 100 meters
- Use GPS in conjunction with compass (remember magnetic variations)

### Energy Conservation
- Minimize physical exertion
- Eat high-calorie emergency rations
- Sleep in short cycles (2-3 hours) to maintain body heat generation

## Recovery Procedures
- When blizzard subsides, assess surroundings before leaving shelter
- Establish communication with base before moving
- If no communication possible, use emergency locator beacon
- Travel only during periods of good visibility

## Equipment Checklist
- Emergency radio with spare batteries
- GPS device
- Emergency bivouac sack
- Snow shovel
- Chemical heat packs (minimum 12)
- High-calorie ration bars (minimum 4000 calories)
- Insulated water container
- Emergency stove with fuel
- First aid kit with hypothermia treatment supplies
    `,
    priority: "critical",
    lastUpdated: new Date(2023, 10, 15),
    tags: ["blizzard", "shelter", "emergency", "survival"],
  },
  {
    id: "guide-2",
    title: "Crevasse Rescue Procedures",
    category: "emergency",
    summary: "Step-by-step procedures for rescuing team members who have fallen into a crevasse.",
    content: `
# Crevasse Rescue Procedures

## Immediate Response

1. **Secure the team**: All members must anchor themselves to prevent further falls.
2. **Assess the situation**: Establish verbal contact with fallen team member if possible.
3. **Alert base**: Use emergency radio to report incident and location.
4. **Prepare rescue equipment**: Set up z-pulley system using rescue kit.

## Rescue Techniques

### Self-Rescue Support
- If victim is conscious and capable, provide support for self-rescue
- Lower additional rope if needed
- Guide victim through prusik knot technique

### Team Rescue
- Establish minimum 3-point anchor system in snow/ice
- Set up z-pulley mechanical advantage system (3:1 or 5:1 depending on weight)
- Designate roles: puller, rope handler, communication, medical
- Use edge protection to prevent rope damage

### Medical Considerations
- Assess for hypothermia and trauma before extraction
- Prepare insulation and warm fluids for immediate use after extraction
- Be prepared to treat for shock and cold injuries

## Equipment Required
- 2x 60m dynamic ropes
- 5x locking carabiners
- 3x prusik loops
- 2x pulleys
- 2x ice screws
- 3x snow pickets
- 1x rescue sled or improvised stretcher
- Thermal blankets
- Hot fluid in thermos

## Prevention
- Always rope up when crossing potential crevasse fields
- Maintain 10m spacing between team members
- Probe suspicious snow bridges before crossing
- Travel early morning when snow bridges are most stable
    `,
    priority: "critical",
    lastUpdated: new Date(2023, 9, 28),
    tags: ["crevasse", "rescue", "emergency", "climbing"],
  },
  {
    id: "guide-3",
    title: "Frostbite Treatment and Prevention",
    category: "medical",
    summary: "Medical procedures for identifying, treating, and preventing frostbite in extreme cold environments.",
    content: `
# Frostbite Treatment and Prevention

## Prevention

1. **Layer appropriately**: Use the three-layer system (wicking, insulating, wind/waterproof).
2. **Keep extremities covered**: Use mittens instead of gloves when possible.
3. **Stay dry**: Change wet clothing immediately.
4. **Monitor team members**: Check for white or waxy skin, especially on face.
5. **Avoid constricting clothing**: Ensure proper blood circulation.

## Recognition

### Frostnip (Stage 1)
- Skin appears red and feels cold
- Tingling or numbness
- No tissue damage
- Reversible with warming

### Superficial Frostbite (Stage 2)
- Skin turns white or grayish-yellow
- Skin feels warm (early sign)
- Area becomes numb
- Tissue still soft when pressed

### Deep Frostbite (Stages 3-4)
- Skin turns white or bluish
- Area feels hard and solid
- Blisters form after rewarming
- Tissue damage may be permanent

## Field Treatment

### For Frostnip and Early Frostbite
- Warm the area with body heat (place hands in armpits)
- Do not rub or massage the affected area
- Apply warm (not hot) water (40-42°C)

### For Severe Frostbite
- Do NOT rewarm if there is any chance of refreezing
- Evacuate to medical facility if possible
- If evacuation delayed:
  - Immerse in warm water (40-42°C) for 15-30 minutes
  - Administer pain medication
  - Protect rewarmed areas with dry, sterile dressings
  - Separate affected fingers and toes with gauze
  - Do not drain blisters in field conditions

## Medications
- Ibuprofen: 400mg every 8 hours (anti-inflammatory)
- Acetaminophen: 1000mg every 6 hours (pain)
- Aspirin: 325mg daily (prevents blood clotting)

## Evacuation Criteria
- Any deep frostbite (Stage 3-4)
- Frostbite on face, hands, feet
- Signs of infection
- Continued severe pain after rewarming
    `,
    priority: "high",
    lastUpdated: new Date(2023, 8, 12),
    tags: ["frostbite", "medical", "cold injury", "treatment"],
  },
  {
    id: "guide-4",
    title: "Generator Maintenance and Troubleshooting",
    category: "equipment",
    summary: "Procedures for maintaining and troubleshooting diesel generators in extreme cold environments.",
    content: `
# Generator Maintenance and Troubleshooting

## Preventative Maintenance

### Daily Checks
1. **Fuel level**: Maintain at least 75% capacity
2. **Oil level**: Check when cold, maintain between min/max marks
3. **Coolant level**: Check when cold, maintain proper antifreeze concentration (-60°C rating)
4. **Air filter**: Inspect for ice buildup
5. **Exhaust path**: Ensure clear of snow and ice
6. **Battery**: Check connections for corrosion

### Weekly Maintenance
1. **Load test**: Run at 80% capacity for 1 hour
2. **Fuel filter**: Check for water contamination
3. **Belts**: Check tension and condition
4. **Hoses**: Inspect for cracks or leaks
5. **Electrical connections**: Check for corrosion or looseness

### Monthly Maintenance
1. **Oil analysis**: Take sample for testing
2. **Fuel system**: Check for leaks, clean primary filter
3. **Starting system**: Test cold start capability
4. **Alternator**: Check output voltage (24.5-28.5V)
5. **Control systems**: Test automatic start/stop functions

## Cold Weather Operation

### Pre-Start Procedures
- Use block heater for minimum 3 hours before starting if generator is cold
- Use winter-grade diesel fuel (Arctic grade)
- Add fuel anti-gel additive when temperatures below -30°C
- Ensure battery is fully charged (check specific gravity)

### Starting Procedure
1. Disable auto-start function
2. Turn on block heater for 3+ hours
3. Set to manual mode
4. Press and hold preheat for 60 seconds
5. Crank for maximum 15 seconds
6. If no start, wait 2 minutes before retry
7. Once running, allow 10 minutes at idle before applying load

## Troubleshooting

### Engine Won't Start
- **Check fuel**: Ensure fuel is not gelled
- **Check battery**: Voltage should be 24V minimum
- **Check glow plugs**: Should heat to orange when activated
- **Check air intake**: Clear of snow and ice
- **Check fuel filter**: Replace if clogged with wax or ice

### Engine Starts But Stops
- **Check fuel filter**: May be partially clogged
- **Check air filter**: May be restricted
- **Check fuel supply**: Ensure day tank is filling
- **Check shutdown sensors**: Possible false overheat reading

### Reduced Power Output
- **Check air filter**: Replace if restricted
- **Check fuel quality**: Test for contamination
- **Check injectors**: May need cleaning
- **Check turbocharger**: Inspect for ice buildup
- **Check exhaust**: Ensure not restricted by snow

## Emergency Procedures
- Keep manual start kit accessible
- Document location of spare parts
- Post emergency shutdown procedure near generator
    `,
    priority: "medium",
    lastUpdated: new Date(2023, 10, 5),
    tags: ["generator", "maintenance", "equipment", "power"],
  },
  {
    id: "guide-5",
    title: "Emergency Communication Protocols",
    category: "emergency",
    summary: "Procedures for establishing emergency communications when primary systems fail.",
    content: `
# Emergency Communication Protocols

## Communication Hierarchy

1. **Primary**: Satellite internet and VoIP phone
2. **Secondary**: Iridium satellite phone network
3. **Tertiary**: HF radio (8.195 MHz USB)
4. **Emergency**: VHF radio (Channel 16 - 156.8 MHz)
5. **Last resort**: Emergency Position Indicating Radio Beacon (EPIRB)

## Equipment Locations

### Main Base
- Satellite phones: Communications room, emergency cabinet
- HF radio: Communications room, backup in emergency shelter
- VHF handhelds: Charging station in equipment room, spares in emergency cabinet
- EPIRB: Main entrance, emergency shelter, each vehicle

### Field Teams
- Each team must carry:
  - 1x satellite phone
  - 1x VHF radio per person
  - 1x personal locator beacon per person
  - Signal mirror and flares

## Emergency Contact Schedule

If primary communications fail:
1. Attempt satellite phone call to base at 08:00, 12:00, 16:00, 20:00 UTC
2. If no response, transmit on HF at 08:15, 12:15, 16:15, 20:15 UTC
3. Monitor VHF Channel 16 continuously when not transmitting

## Distress Signals

### Radio Distress Call
1. "MAYDAY, MAYDAY, MAYDAY"
2. Station name/call sign
3. Position (coordinates)
4. Nature of emergency
5. Assistance required
6. Other information (persons involved, conditions)

### Satellite Phone Emergency
1. Call base first
2. If no response, call emergency coordination center: +61 1800 641 792
3. Provide same information as radio distress call

### EPIRB Activation
- Remove from mounting
- Extend antenna fully
- Activate switch
- Place on highest point available with clear sky view
- Remain with beacon if possible

## Communication Failure Procedures

### If Base Cannot Be Contacted
- Attempt all communication methods in hierarchy
- If all fail, implement self-rescue or shelter-in-place according to situation
- If moving, leave clear markers indicating direction and time

### If Field Team Cannot Be Contacted
- Base will dispatch search team after missing two scheduled communications
- Search priority will follow last known route and emergency shelter locations

## Message Formats

### Position Report
- Call sign
- GPS coordinates (decimal degrees)
- Elevation
- Current activity
- Next waypoint
- ETA next waypoint
- Weather conditions
- Team status

### Medical Emergency
- Call sign
- "MEDICAL EMERGENCY"
- Patient name
- Nature of injury/illness
- Vital signs
- Treatment given
- GPS coordinates
- Weather conditions
    `,
    priority: "critical",
    lastUpdated: new Date(2023, 11, 1),
    tags: ["communication", "emergency", "radio", "satellite"],
  },
];

export function getGuidesByCategory(category: string) {
  return survivalGuides.filter(guide => guide.category === category);
}

export function getGuideById(id: string) {
  return survivalGuides.find(guide => guide.id === id);
}

export function searchGuides(query: string) {
  const lowerQuery = query.toLowerCase();
  return survivalGuides.filter(guide => 
    guide.title.toLowerCase().includes(lowerQuery) ||
    guide.summary.toLowerCase().includes(lowerQuery) ||
    guide.content.toLowerCase().includes(lowerQuery) ||
    guide.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
}