using System.Text.Json;
using System.Text.Json.Serialization;

namespace HieuNinhCV.Server;

public static class PocketBaseDateParser
{
    public static DateTime? Parse(string? value)
    {
        if (string.IsNullOrWhiteSpace(value))
            return null;

        // Try standard ISO-8601 first
        if (DateTime.TryParse(value, out var result))
            return result;

        // Fallback to PocketBase format (which uses space instead of T)
        if (DateTime.TryParse(value.Replace(" ", "T"), out result))
            return result;

        return null;
    }
}

public class PocketBaseDateConverter : JsonConverter<DateTime>
{
    public override DateTime Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
    {
        var value = reader.GetString();
        return PocketBaseDateParser.Parse(value) ?? default;
    }

    public override void Write(Utf8JsonWriter writer, DateTime value, JsonSerializerOptions options)
    {
        writer.WriteStringValue(value.ToString("yyyy-MM-ddTHH:mm:ss.fffZ"));
    }
}

public class NullablePocketBaseDateConverter : JsonConverter<DateTime?>
{
    public override DateTime? Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
    {
        if (reader.TokenType == JsonTokenType.Null)
            return null;

        var value = reader.GetString();
        return PocketBaseDateParser.Parse(value);
    }

    public override void Write(Utf8JsonWriter writer, DateTime? value, JsonSerializerOptions options)
    {
        if (value == null)
            writer.WriteNullValue();
        else
            writer.WriteStringValue(value.Value.ToString("yyyy-MM-ddTHH:mm:ss.fffZ"));
    }
}
