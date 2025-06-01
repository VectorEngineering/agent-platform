import { z } from 'zod'

// Utility schema types
const LowCardinalityString = z.string()
const DateTimeString = z.string() // ISO DateTime string
const UnixTimestamp = z.number().int()

// Lead Interaction Events Schema
export const LeadInteractionEventSchema = z.object({
    // Event Identification
    workspace_id: z.string(),
    event_id: z.string().uuid(),
    lead_id: z.string(),
    time: DateTimeString,
    event_source: z.string(),
    event_version: z.string(),

    // Interaction Context
    interaction_type: LowCardinalityString,
    interaction_subtype: LowCardinalityString,
    channel: LowCardinalityString,
    sub_channel: LowCardinalityString,
    campaign_id: z.string().optional(),
    campaign_group: z.string().optional(),
    experiment_id: z.string().optional(),
    variant_id: z.string().optional(),

    // Interaction Quality & Metrics
    duration_seconds: z.number().int(),
    duration_milliseconds: z.number().int(),
    depth_of_engagement: z.number().int().min(0).max(100),
    quality_score: z.number().int().min(0).max(100),
    completion_rate: z.number().min(0).max(1),
    bounce: z.boolean(),
    exit_intent: z.boolean(),
    rage_click_count: z.number().int().min(0),
    dead_click_count: z.number().int().min(0),
    error_count: z.number().int().min(0),

    // Intent & Behavior Signals
    intent_signals: z.array(LowCardinalityString),
    intent_categories: z.array(LowCardinalityString),
    behavior_flags: z.array(LowCardinalityString),
    interest_shown: z.array(LowCardinalityString),
    pain_points: z.array(LowCardinalityString),
    objections: z.array(LowCardinalityString),
    sentiment_score: z.number().int().min(-100).max(100),
    urgency_signals: z.array(LowCardinalityString),

    // Content Interaction
    content_id: z.string().optional(),
    content_type: LowCardinalityString.optional(),
    content_category: z.array(LowCardinalityString),
    content_topic: z.array(LowCardinalityString),
    content_format: LowCardinalityString.optional(),
    content_language: LowCardinalityString,
    content_version: z.string().optional(),
    content_stage: LowCardinalityString,
    content_engagement_metrics: z.record(z.string(), z.number()),

    // Content Consumption
    scroll_depth: z.number().int().min(0).max(100),
    scroll_depth_milestones: z.array(z.number().int().min(0).max(100)),
    time_on_content: z.number().int().min(0),
    attention_time: z.number().int().min(0),
    read_percentage: z.number().min(0).max(1),
    video_watch_percentage: z.number().min(0).max(1),
    video_milestones: z.array(z.number().int().min(0).max(100)),
    interaction_count: z.number().int().min(0),

    // Form & Input Data
    form_id: z.string().optional(),
    form_name: z.string().optional(),
    form_type: LowCardinalityString.optional(),
    form_steps_total: z.number().int().min(0).optional(),
    form_step_reached: z.number().int().min(0).optional(),
    form_fields_total: z.number().int().min(0).optional(),
    form_fields_filled: z.number().int().min(0).optional(),
    form_submission_success: z.boolean().optional(),
    form_errors: z.array(z.string()),

    // Chat & Conversation
    conversation_id: z.string().optional(),
    message_count: z.number().int().min(0).optional(),
    response_time_avg: z.number().int().min(0).optional(),
    chat_duration: z.number().int().min(0).optional(),
    chat_sentiment_score: z.number().int().min(-100).max(100).optional(),
    chat_topics: z.array(LowCardinalityString),
    chat_resolution_status: LowCardinalityString.optional(),
    chat_agent_id: z.string().optional(),

    // Call & Meeting Data
    call_id: z.string().optional(),
    call_type: LowCardinalityString.optional(),
    call_outcome: LowCardinalityString.optional(),
    call_duration: z.number().int().min(0).optional(),
    call_recording_url: z.string().url().optional(),
    call_transcript_summary: z.string().optional(),
    call_next_steps: z.array(z.string()),
    call_participants: z.array(z.string()),

    // Email Interaction
    email_id: z.string().optional(),
    email_subject: z.string().optional(),
    email_template_id: z.string().optional(),
    email_campaign_id: z.string().optional(),
    email_open_count: z.number().int().min(0).optional(),
    email_click_count: z.number().int().min(0).optional(),
    email_reply: z.boolean().optional(),
    email_reply_time: z.number().int().min(0).optional(),
    email_links_clicked: z.array(z.string()),

    // Journey & Session
    session_id: z.string(),
    session_number: z.number().int().positive(),
    sequence_number: z.number().int().positive(),
    interaction_path: z.string(),
    previous_interaction_id: z.string().optional(),
    next_interaction_id: z.string().optional(),
    journey_stage: LowCardinalityString,
    journey_scenario: LowCardinalityString,

    // Technical Context
    device_fingerprint: z.string(),
    device_type: LowCardinalityString,
    device_brand: z.string(),
    device_model: z.string(),
    os_name: LowCardinalityString,
    os_version: z.string(),
    browser_name: LowCardinalityString,
    browser_version: z.string(),
    screen_resolution: z.string(),
    viewport_size: z.string(),
    connection_type: LowCardinalityString,
    connection_speed: z.number().min(0),

    // Location & Time
    ip_address: z.string().ip(),
    user_agent: z.string(),
    geo_country: LowCardinalityString,
    geo_region: LowCardinalityString,
    geo_city: z.string(),
    geo_postal_code: z.string(),
    geo_coordinates: z.tuple([z.number(), z.number()]),
    timezone: z.string(),
    local_time: DateTimeString,

    // Business Context
    business_hours: z.boolean(),
    response_time_seconds: z.number().int().min(0),
    was_scheduled: z.boolean(),
    priority: LowCardinalityString,
    interaction_outcome: LowCardinalityString,
    outcome_reason: z.string(),
    next_action: z.string(),
    next_action_due: DateTimeString,
    assigned_to: z.string(),

    // Integration Data
    source_system: z.string(),
    source_timestamp: UnixTimestamp,
    integration_id: z.string(),
    external_id: z.string(),
    sync_status: LowCardinalityString,

    // Metadata
    created_at: DateTimeString,
    updated_at: DateTimeString,
    processed_at: DateTimeString,
    version: z.number().int().positive(),
    is_deleted: z.number().int().min(0).max(1),
    deletion_time: DateTimeString.nullable(),

    // Custom & Extended Data
    tags: z.array(LowCardinalityString),
    labels: z.record(z.string(), z.string()),
    custom_attributes: z.record(z.string(), z.string()),
    metadata: z
        .string()
        .transform((str) => JSON.parse(str))
        .pipe(z.record(z.unknown())),
    debug_info: z.string(),
    raw_data: z.string()
})

// Type inference
export type LeadInteractionEvent = z.infer<typeof LeadInteractionEventSchema>
